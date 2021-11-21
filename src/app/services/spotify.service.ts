import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../interfaces/album.interface';
import { map } from 'rxjs'
import { ItemArtista } from '../interfaces/artist.interface';
import { Track } from '../interfaces/tracks.interface';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private token!:string;

  constructor(private http:HttpClient) {}

  getQuery(query:string):Observable<any>{

    const url = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+this.token
    });
    return this.http.get(url,{headers});
  }

  getNewReleases():Observable<Item[]>{

    return this.getQuery('browse/new-releases?limit=20&offset=2')
            .pipe(map(data => data.albums.items));
  }

  getArtistas(termino: string):Observable<ItemArtista[]>{
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
            .pipe(map(data => data.artists.items));
  }

  getArtista(id: string):Observable<ItemArtista>{
    return this.getQuery(`artists/${id}`);
  }

  getTopTracks(id: string):Observable<Track[]>{
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
            .pipe(map(data => data.tracks));
  }

  setToke(token:string){
    this.token = token;
  }

  getToke():Observable<any>{
    return this.http.get("https://api-spotify-tokenn.herokuapp.com/");
  }

}
