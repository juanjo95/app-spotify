import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Track } from 'src/app/interfaces/tracks.interface';
import { ItemArtista } from 'src/app/interfaces/artist.interface';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css']
})
export class ArtistaComponent{

  artista!: ItemArtista;
  topTracks!: Track[];

  loading!:boolean;

  constructor(private router:ActivatedRoute, private spotifyService:SpotifyService) {

    this.loading = true;

    this.router.params.subscribe(res => {
      this.getArtista(res['id']);
      this.getTopTracks(res['id']);
    });
  }

  getArtista(id:string):void{

    this.loading = true;

    this.spotifyService.getArtista(id).subscribe((res:ItemArtista) => {
      this.artista = res;
    });
  }

  getTopTracks(id:string):void{
    this.spotifyService.getTopTracks(id).subscribe((res:Track[]) => {
      console.log(res);
      this.topTracks = res;
      this.loading = false;
    });
  }

}
