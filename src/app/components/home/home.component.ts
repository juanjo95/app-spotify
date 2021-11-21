import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/interfaces/album.interface';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  nuevasCanciones:Array<Item> = [];
  loading!:boolean;

  error!: boolean;
  mensajeError: string = '';

  constructor(private spotify: SpotifyService) {

    this.loading = true;
    this.error = false;

    this.spotify.getToke().subscribe(res => {
      this.spotify.setToke(res.access_token);
        this.spotify.getNewReleases().subscribe((data:Item[]) => {
          this.nuevasCanciones = data;
          this.loading = false;
        },(errorServ) =>{
          this.error = true;
          this.loading = false;
          this.mensajeError = errorServ.error.error.message;
          console.log(errorServ.error.error.message);
        });
    });
  }

  ngOnInit(): void {}

}
