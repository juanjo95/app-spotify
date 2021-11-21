import { Component, OnInit } from '@angular/core';
import { ItemArtista } from 'src/app/interfaces/artist.interface';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  artistas:Array<ItemArtista> = [];
  loading!:boolean;

  constructor(private spotify: SpotifyService) { }

  ngOnInit(): void {
  }

  buscar(termino: string){
    this.loading = true;
    this.spotify.getArtistas(termino).subscribe((data:ItemArtista[]) => {
      this.artistas = data;
      this.loading = false;
    });
  }

}
