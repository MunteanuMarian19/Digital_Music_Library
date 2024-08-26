import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistService } from '../services/artist.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-album-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss'],
})
export class AlbumDetailsComponent implements OnInit, AfterViewInit {
  @ViewChild('editSongFormRef') editSongFormRef?: ElementRef;
  @ViewChild('addSongFormRef') addSongFormRef?: ElementRef;
  @ViewChild('editForm') editForm?: ElementRef;

  album: any;
  artist: any;
  artistId: string | null = null;
  albumId: string | null = null;
  editingSong: { title: string; length: string } = { title: '', length: '' };
  editingSongIndex: number | null = null;
  newSong: { title: string; length: string } = { title: '', length: '' };

  newSongLength = {
    minutes: '',
    seconds: 0,
  };

  songFormData = {
    title: '',
    lengthMinutes: '',
    lengthSeconds: 0,
  };

  secondsArray: number[] = Array.from({ length: 60 }, (_, i) => i);

  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.artistId = this.route.snapshot.paramMap.get('artistId');
    this.albumId = this.route.snapshot.paramMap.get('albumId');

    if (this.artistId && this.albumId) {
      this.artistService.getArtist(this.artistId).subscribe((data) => {
        this.artist = data;
        this.album = data.albums.find(
          (album: any) => album._id === this.albumId
        );

        if (!this.album) {
          console.error('Invalid album id');
        }
      });
    } else {
      console.error('Invalid artistId or albumId');
    }
  }

  ngAfterViewInit() {
    // Delay scrolling to ensure DOM updates are complete
    setTimeout(() => {
      if (this.editingSongIndex !== null && this.editSongFormRef) {
        this.scrollToForm();
      }
    }, 0);
  }

  scrollToForm(): void {
    if (this.editForm?.nativeElement) {
      this.editForm.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

  deleteAlbum(): void {
    if (this.artistId !== null && this.album && this.album._id) {
      this.artistService.deleteAlbum(this.artistId, this.album._id).subscribe({
        next: (data) => {
          this.router.navigate([`/artists/${this.artistId}`]);
        },
        error: (error) => {
          console.error('Error deleting album:', error);
        },
      });
    }
  }

  validateMinutesInput(event: KeyboardEvent): void {
    const char = String.fromCharCode(event.which);
    if (!/^\d$/.test(char)) {
      event.preventDefault();
    }
  }

  isSongLengthInvalid(): boolean {
    const minutes = parseInt(this.songFormData.lengthMinutes, 10);
    return (
      isNaN(minutes) ||
      minutes < 0 ||
      this.songFormData.lengthSeconds < 0 ||
      this.songFormData.lengthSeconds > 59
    );
  }

  addSong(): void {
    const minutes = parseInt(this.newSongLength.minutes, 10);
    if (this.newSong.title && !isNaN(minutes) && !this.isSongLengthInvalid()) {
      this.newSong.length = `${minutes}:${this.newSongLength.seconds
        .toString()
        .padStart(2, '0')}`;

      this.album.songs.push({ ...this.newSong });
      if (this.artistId && this.album._id) {
        this.artistService
          .updateAlbum(this.artistId, this.album._id, this.album)
          .subscribe({
            next: (data) => {
              console.log('Song added successfully:', data);
              this.artist = data;
              this.album = data.albums.find(
                (album: any) => album._id === this.albumId
              );
              this.newSong = { title: '', length: '' };
              this.newSongLength = { minutes: '', seconds: 0 };
            },
            error: (error) => {
              console.error('Error adding song:', error);
            },
          });
      }
    }
  }

  editSong(index: number): void {
    console.log('Editing song at index:', index);
    this.editingSongIndex = index;
    const song = this.album.songs[index];
    const [minutes, seconds] = song.length.split(':').map(Number);

    this.songFormData = {
      title: song.title,
      lengthMinutes: minutes.toString(),
      lengthSeconds: seconds,
    };
    setTimeout(() => {
      const element = document.getElementById('editForm');
      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          behavior: 'smooth',
        });
      }
    }, 0);
  }

  saveSong(): void {
    const minutes = parseInt(this.songFormData.lengthMinutes, 10);
    if (
      this.songFormData.title &&
      !isNaN(minutes) &&
      !this.isSongLengthInvalid()
    ) {
      const length = `${minutes}:${this.songFormData.lengthSeconds
        .toString()
        .padStart(2, '0')}`;
      const song = { title: this.songFormData.title, length };

      if (this.editingSongIndex !== null) {
        this.album.songs[this.editingSongIndex] = song;
      } else {
        this.album.songs.push(song);
      }

      if (this.artistId && this.album._id) {
        this.artistService
          .updateAlbum(this.artistId, this.album._id, this.album)
          .subscribe({
            next: (data) => {
              console.log(
                this.editingSongIndex !== null
                  ? 'Song updated successfully'
                  : 'Song added successfully',
                data
              );
              this.artist = data;
              this.album = data.albums.find(
                (album: any) => album._id === this.albumId
              );
              this.resetForm();
            },
            error: (error) => {
              console.error(
                this.editingSongIndex !== null
                  ? 'Error updating song:'
                  : 'Error adding song:',
                error
              );
            },
          });
      }
    }
  }

  resetForm(): void {
    this.songFormData = { title: '', lengthMinutes: '', lengthSeconds: 0 };
    this.editingSongIndex = null;
  }

  deleteSong(index: number): void {
    if (this.album && index >= 0 && index < this.album.songs.length) {
      this.album.songs.splice(index, 1);
      if (this.artistId && this.album._id) {
        this.artistService
          .updateAlbum(this.artistId, this.album._id, this.album)
          .subscribe({
            next: (data) => {
              console.log('Song deleted successfully:', data);
              this.artist = data;
              this.album = data.albums.find(
                (album: any) => album._id === this.albumId
              );
            },
            error: (error) => {
              console.error('Error deleting song:', error);
            },
          });
      }
    }
  }
}
