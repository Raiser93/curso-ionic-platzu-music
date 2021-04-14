import { Component, Input, OnInit } from '@angular/core';
import { ViewDidEnter, ModalController } from '@ionic/angular';

@Component({
    selector: 'app-songs-modal',
    templateUrl: './songs-modal.page.html',
    styleUrls: ['./songs-modal.page.scss'],
})
export class SongsModalPage implements ViewDidEnter {

    @Input() songs: any[] = [];
    @Input() artist: any = {};

    constructor(
        private modalCtrl: ModalController
    ) {}
    
    ionViewDidEnter() {
        console.log(this.songs);
        console.log(this.artist);
    }

    selectSong(song) {
        this.modalCtrl.dismiss(song);
    }

}
