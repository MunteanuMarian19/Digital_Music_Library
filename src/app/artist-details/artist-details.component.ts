import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ArtistService } from '../services/artist.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-artist-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.scss'],
})
export class ArtistDetailsComponent implements OnInit {
  artist: any;
  albums: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.artistService.getArtist(id!).subscribe((data) => {
      this.artist = data;
      this.albums = data.albums;
    });
  }
}
