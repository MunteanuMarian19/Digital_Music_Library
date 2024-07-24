import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ArtistService } from '../services/artist.service';

@Component({
  selector: 'app-artists',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss'],
})
export class ArtistsComponent implements OnInit {
  artists: any[] = [];
  newArtist: { name: string } = { name: '' };

  constructor(private artistService: ArtistService, private router: Router) {}

  ngOnInit(): void {
    this.artistService.getArtists().subscribe((data) => {
      this.artists = data;
    });
  }

  addArtist(): void {
    if (this.newArtist.name) {
      this.artistService.createArtist(this.newArtist).subscribe((data) => {
        // Navigate to the newly created artist's detail page
        this.router.navigate([`/artists/${data._id}`]);
      });
    }
  }
}
