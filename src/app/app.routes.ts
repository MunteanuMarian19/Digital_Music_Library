import { Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { ArtistsComponent } from './artists/artists.component';
import { ArtistDetailsComponent } from './artist-details/artist-details.component';
import { AlbumDetailsComponent } from './album-details/album-details.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'artists', component: ArtistsComponent },
  { path: 'artists/:artistId', component: ArtistDetailsComponent },
  {
    path: 'artists/:artistId/albums/:albumId',
    component: AlbumDetailsComponent,
  },
  { path: '**', redirectTo: '' }, // Redirect any unknown routes to HomeComponent
];
