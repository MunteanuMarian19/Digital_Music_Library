import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ArtistService } from '../services/artist.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-artist-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.scss'],
})
export class ArtistDetailsComponent implements OnInit, AfterViewInit {
  @ViewChild('addAlbumForm') addAlbumForm?: ElementRef;
  @ViewChild('editAlbumForm') editAlbumForm?: ElementRef;

  artist: any;
  albums: any[] = [];
  newAlbum: {
    title: string;
    description: string;
    songs: { title: string; length: string }[];
  } = { title: '', description: '', songs: [] };

  editingAlbum: {
    _id?: string;
    title: string;
    description: string;
    songs: { title: string; length: string }[];
  } | null = null;

  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistService
  ) {}

  ngOnInit(): void {
    const artistId = this.route.snapshot.paramMap.get('artistId');
    if (artistId) {
      this.artistService.getArtist(artistId).subscribe((data) => {
        this.artist = data;
        this.albums = data.albums || [];
      });
    }
  }

  ngAfterViewInit(): void {
    if (this.editingAlbum) {
      setTimeout(() => {
        if (this.editAlbumForm) {
          this.scrollToForm(this.editAlbumForm);
        }
      }, 0);
    }
    if (this.newAlbum) {
      setTimeout(() => {
        if (this.addAlbumForm) {
          this.scrollToForm(this.addAlbumForm);
        }
      }, 0);
    }
  }

  scrollToForm(formRef: ElementRef): void {
    formRef.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  updateAlbum(): void {
    if (this.editingAlbum && this.editingAlbum._id) {
      this.artistService
        .updateAlbum(this.artist._id, this.editingAlbum._id, this.editingAlbum)
        .subscribe({
          next: (data) => {
            console.log('Album updated successfully:', data);
            this.artist = data;
            this.albums = data.albums || [];
            this.editingAlbum = null;
          },
          error: (error) => {
            console.error('Error updating album:', error);
          },
        });
    }
  }

  addAlbum(): void {
    console.log('Adding album with data:', this.newAlbum);

    if (this.validateAlbum(this.newAlbum)) {
      this.artistService.addAlbum(this.artist._id, this.newAlbum).subscribe({
        next: (data) => {
          console.log('Album added successfully:', data);
          this.artist = data;
          this.albums = data.albums;
          this.newAlbum = { title: '', description: '', songs: [] };
        },
        error: (error) => {
          console.error('Error adding album:', error);
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }

  deleteAlbum(albumId: string): void {
    this.artistService.deleteAlbum(this.artist._id, albumId).subscribe({
      next: (data) => {
        this.artist = data;
        this.albums = data.albums || [];
      },
      error: (error) => {
        console.error('Error deleting album:', error);
      },
    });
  }

  editAlbum(album: any): void {
    this.editingAlbum = album;
    setTimeout(() => {
      if (this.editAlbumForm) {
        this.scrollToForm(this.editAlbumForm);
      }
    }, 0);
  }

  addAlbumFormScroll(): void {
    setTimeout(() => {
      if (this.addAlbumForm) {
        this.scrollToForm(this.addAlbumForm);
      }
    }, 0);
  }

  validateAlbum(album: any): boolean {
    if (!album.title || !album.description) {
      return false;
    }
    for (const song of album.songs) {
      if (!song.title || !this.isValidSongLength(song.length)) {
        return false;
      }
    }
    return true;
  }

  isValidSongLength(length: string): boolean {
    const [minutes, seconds] = length
      .split(':')
      .map((part) => parseInt(part, 10));
    return (
      Number.isInteger(minutes) &&
      minutes >= 0 &&
      Number.isInteger(seconds) &&
      seconds >= 0 &&
      seconds < 60
    );
  }
}
