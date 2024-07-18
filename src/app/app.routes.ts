import { Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { AlbumsComponent } from './albums/albums.component';
import { ArtistsComponent } from './artists/artists.component';
import { ArtistDetailsComponent } from './artist-details/artist-details.component';
import { AlbumDetailsComponent } from './album-details/album-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'artists', pathMatch: 'full' },
  { path: 'search', component: SearchComponent },
  { path: 'albums', component: AlbumsComponent },
  { path: 'albums/:artistId/:albumIndex', component: AlbumDetailsComponent }, 
  { path: 'artists', component: ArtistsComponent },
  { path: 'artists/:id', component: ArtistDetailsComponent },
];
