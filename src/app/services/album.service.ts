import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  private apiUrl = 'http://localhost:5000/api/albums';

  constructor(private http: HttpClient) {}

  getAlbums(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getAlbum(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
