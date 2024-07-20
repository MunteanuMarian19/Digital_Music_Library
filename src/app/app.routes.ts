import { Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { AlbumsComponent } from './albums/albums.component';
import { ArtistsComponent } from './artists/artists.component';
import { ArtistDetailsComponent } from './artist-details/artist-details.component';
import { AlbumDetailsComponent } from './album-details/album-details.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  // {
  //   path: 'search',
  //   loadComponent: () =>
  //     import('./search/search.component').then((m) => m.SearchComponent),
  // },
  { path: 'albums', component: AlbumsComponent },
<<<<<<< HEAD
  { path: 'albums/:artistId/:albumIndex', component: AlbumDetailsComponent },
=======
<<<<<<< HEAD
  { path: 'albums/:artistId/:albumIndex', component: AlbumDetailsComponent },
=======
  { path: 'albums/:artistId/:albumIndex', component: AlbumDetailsComponent }, 
>>>>>>> origin/master
>>>>>>> origin/master
  { path: 'artists', component: ArtistsComponent },
  { path: 'artists/:id', component: ArtistDetailsComponent },
  { path: '**', redirectTo: '' }, // Redirect any unknown routes to HomeComponent
];

//export default routes;

// import { Routes } from '@angular/router';
// import { ArtistsComponent } from './artists/artists.component';
// import { ArtistDetailsComponent } from './artist-details/artist-details.component';
// import { AlbumDetailsComponent } from './album-details/album-details.component';
// import { HomeComponent } from './home/home.component'; // Import the HomeComponent

// const routes: Routes = [
//   { path: '', component: HomeComponent }, // Set HomeComponent as the default route
//   { path: 'artists', component: ArtistsComponent },
//   { path: 'artists/:id', component: ArtistDetailsComponent },
//   { path: 'albums/:artistId/:albumIndex', component: AlbumDetailsComponent },
//   {
//     path: 'search',
//     loadComponent: () =>
//       import('./search/search.component').then((m) => m.SearchComponent),
//   },
//   { path: '**', redirectTo: '' }, // Redirect any unknown routes to HomeComponent
// ];

// export default routes;
