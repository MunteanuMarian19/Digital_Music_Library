import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  private apiUrl = 'http://localhost:5000/api/artists';

  constructor(private http: HttpClient) {}

  // Get all artists
  getArtists(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Get one artists
  getArtist(artistId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${artistId}`);
  }

  // Search for artists by name
  searchArtists(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/search/${name}`);
  }

  // Create a new artist
  createArtist(artist: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, artist);
  }
  // Delete an artist
  deleteArtist(artistId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${artistId}`);
  }

  getAlbums(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  // Add an album to an artist
  addAlbum(artistId: string, album: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${artistId}/albums`, album);
  }

  // Update an existing album
  updateAlbum(artistId: string, albumId: string, album: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/${artistId}/albums/${albumId}`,
      album
    );
  }

  //you can delete an album from /artists/artistId
  deleteAlbum(artistId: string, albumId: string): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/${artistId}/albums/${albumId}`
    );
  }
}
