import { Component, OnInit } from '@angular/core';
import { ModalController, ViewDidEnter } from '@ionic/angular';
import { Item } from '../interface/interface';
import { PlatziMusicService } from '../services/platzi-music.service';
import { SongsModalPage } from '../songs-modal/songs-modal.page';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements ViewDidEnter {

    slideOps = {
        loop: false,
        slidesPerView: 4,
        slidesPerGroup: 4,
        grabCursor: true,
        spaceBetween: 30,
        speed: 400,
        centeredSLides: true
    }
    
    subArtistGet;
    artists: any[] = [];
    songs: Item[] = [];
    albums: Item[] = [];
    song: {
        preview_url: string,
        playing: boolean,
        name: string
    } = {
        preview_url: '',
        playing: false,
        name: ''
    };
    currentSong: HTMLAudioElement;
    newTime: any;

    constructor(
        private platziMusicService: PlatziMusicService,
        private modalCtrl: ModalController
    ) {}

    ionViewDidEnter() {
        this.platziMusicService.getNewReleases().subscribe(resp => {
            for (const item of resp.albums.items) {
                if (item.artists && item.artists.length) {
                    this.artists.push(...item.artists);
                }
            }
            const stringArtist = this.artists.map(a => a.id).join(',');
            this.subArtistGet = this.platziMusicService.getSeveralArtists(stringArtist);

            this.songs = resp.albums.items.filter(e => e.album_type === 'single');
            this.albums = resp.albums.items.filter(e => e.album_type === 'album');
        });
    }

    showSongs(artist) {
        this.platziMusicService.getArtistTopTracks(artist).subscribe(async (songs: any) => {
            console.log(songs);
            
            const modal = await this.modalCtrl.create({
                component: SongsModalPage,
                componentProps: {
                    songs: songs.tracks,
                    artist
                }
            });
            await modal.present();

            modal.onDidDismiss().then(({data}) => {
                if (data) {
                    this.song = data;
                    this.currentSong = new Audio(this.song.preview_url);
                    this.newTime = (1 / this.currentSong.duration) * this.currentSong.currentTime;
                }
            });
        });
    }

    showSongsAlbum(album) {
        this.platziMusicService.getAlbumTopTracks(album).subscribe(async (songs: any) => {
            console.log(songs);
            const modal = await this.modalCtrl.create({
                component: SongsModalPage,
                componentProps: {
                    songs: songs.items,
                    artist: album
                }
            });
            await modal.present();
            modal.onDidDismiss().then(({data}) => {
                if (data) {
                    this.song = data;
                    this.currentSong = new Audio(this.song.preview_url);
                    this.newTime = (1 / this.currentSong.duration) * this.currentSong.currentTime;
                }
            });
        });
    }

    play() {
        if (this.song.preview_url) {
            // this.currentSong = new Audio(this.song.preview_url);
            this.currentSong.play();
            this.currentSong.addEventListener('timeupdate', () => {
                this.newTime = (1 / this.currentSong.duration) * this.currentSong.currentTime;
                if (this.newTime === 1) {
                    this.pause();
                }
            });
            this.song.playing = true;
        }
    }
    pause() {
        if (this.song.preview_url) {
            this.currentSong.pause();
            this.song.playing = false;
        }
    }

}
