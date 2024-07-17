import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ArtistService } from '../services/artist.service';

@Component({
  selector: 'app-artists',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss'],
})
export class ArtistsComponent implements OnInit {
  artists: any[] = [];
  albums: any[] = [];

  constructor(private artistService: ArtistService) {}

  ngOnInit(): void {
    this.artistService.getArtists().subscribe((data) => {
      this.artists = data;
    });
  }
}
