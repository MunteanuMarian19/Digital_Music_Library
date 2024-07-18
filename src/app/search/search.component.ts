import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ArtistService } from '../services/artist.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  query: string = '';
  suggestions: any[] = [];

  constructor(private artistService: ArtistService, private router: Router) {}

  ngOnInit(): void {}

  onSearch(): void {
    if (this.query.length > 0) {
      this.artistService.searchArtists(this.query).subscribe((data) => {
        this.suggestions = data;
      });
    } else {
      this.suggestions = [];
    }
  }

  onSelectSuggestion(suggestion: any): void {
    this.router.navigate(['/artists', suggestion._id]);
  }
}

// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { ArtistService } from '../services/artist.service';
// import { Subject } from 'rxjs';
// import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

// @Component({
//   selector: 'app-search',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './search.component.html',
//   styleUrls: ['./search.component.scss'],
// })
// export class SearchComponent implements OnInit {
//   query: string = '';
//   suggestions: any[] = [];
//   private searchTerms = new Subject<string>();

//   constructor(private artistService: ArtistService, private router: Router) {}

//   ngOnInit(): void {
//     this.searchTerms
//       .pipe(
//         debounceTime(300), // wait 300ms after each keystroke before considering the term
//         distinctUntilChanged(), // ignore new term if same as previous term
//         switchMap((term: string) => this.artistService.searchArtists(term))
//       )
//       .subscribe((data) => {
//         this.suggestions = data;
//       });
//   }

//   onSearch(): void {
//     this.searchTerms.next(this.query);
//   }

//   onSelectSuggestion(suggestion: any): void {
//     this.router.navigate(['/artists', suggestion._id]);
//   }
// }
