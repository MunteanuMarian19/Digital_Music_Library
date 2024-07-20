import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from '../services/album.service';
import { ArtistService } from '../services/artist.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-album-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss'],
})
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======

>>>>>>> origin/master
>>>>>>> origin/master
export class AlbumDetailsComponent implements OnInit {
  album: any;
  artist: any;

  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistService
  ) {}

  ngOnInit(): void {
    const artistId = this.route.snapshot.paramMap.get('artistId');
    const albumIndex = this.route.snapshot.paramMap.get('albumIndex');

    this.artistService.getArtist(artistId!).subscribe((data) => {
      this.artist = data;
      this.album = data.albums[+albumIndex!]; // Get the album using the index
    });
  }
}
