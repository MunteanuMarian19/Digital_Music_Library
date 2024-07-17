import { Component } from '@angular/core';
import { ArtistService } from '../services/artist.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  query: string = '';
  results: any[] = [];

  constructor(private artistService: ArtistService) {}

  search(): void {
    if (this.query) {
      this.artistService.searchArtists(this.query).subscribe((data) => {
        this.results = data;
      });
    }
  }
}
