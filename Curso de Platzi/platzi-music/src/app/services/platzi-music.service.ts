import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TOKEN } from '../config/config';
import { SpotifyResponse } from '../interface/interface';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PlatziMusicService {

    constructor(
        private http: HttpClient
    ) {}

    getQuery<T>(query: string) {
        const url = `https://api.spotify.com/v1/${query}`;
        const headers = new HttpHeaders({
            Authorization: `Bearer ${TOKEN}`
        });
        return this.http.get<T>(url, {headers});
    }

    getNewReleases() {
        return this.getQuery<SpotifyResponse>(`browse/new-releases?country=JP`);
    }

    getSeveralArtists(ids: string) {
        return this.getQuery(`artists?ids=${ids}`).pipe(
            map((resp: any) => {
                console.log(resp);
                return resp.artists;
            })
        );
    }

    getArtistTopTracks(artist) {
        return this.getQuery(`artists/${artist.id}/top-tracks?market=JP`);
    }

    getAlbumTopTracks(album) {
        return this.getQuery(`albums/${album.id}/tracks?market=JP`);
    }
}
