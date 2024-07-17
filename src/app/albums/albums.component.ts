import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AlbumService } from '../services/album.service';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
})
export class AlbumsComponent implements OnInit {
  albums: any[] = [];

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {
    this.albumService.getAlbums().subscribe((data) => {
      this.albums = data;
    });
  }
}
