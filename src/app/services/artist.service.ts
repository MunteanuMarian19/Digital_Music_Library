import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======

>>>>>>> origin/master
>>>>>>> origin/master
export class ArtistService {
  private apiUrl = 'http://localhost:5000/api/artists';
  private albumUrl = 'http://localhost:5000/api/albums'; // New endpoint for albums

  constructor(private http: HttpClient) {}

  getArtists(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getArtist(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getAlbum(id: string): Observable<any> {
    return this.http.get<any>(`${this.albumUrl}/${id}`); // Fetch album by ID
  }

  searchArtists(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/search/${name}`);
  }
}
