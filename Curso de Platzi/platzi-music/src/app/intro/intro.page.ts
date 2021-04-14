import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'app-intro',
    templateUrl: './intro.page.html',
    styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

    slideOps = {
        initialSlide: 0,
        slidesPerView: 1,
        centeredSlides: true,
        speed: 400
    }
    slides = [
        {
            imageSrc: 'assets/img/logo.png',
            imageAlt: 'Platzi Music Logo',
            title: 'Descarga tu música.',
            subTitle: 'Escúchala donde quieras.',
            description: 'Escucha las canciones que te encantan y descubre música y podcasts nuevos.',
            icon: 'musical-notes'
        },
        {
            imageSrc: 'assets/img/logo.png',
            imageAlt: 'Platzi Music Logo',
            title: 'Sin anuncios.',
            subTitle: 'Disfruta de tu música sin límites.',
            description: 'Te ayudaremos a crear playlists. O puedes disfrutar de playlists hechas por expertos en música.',
            icon: 'alert-circle'
        },
        {
            imageSrc: 'assets/img/logo.png',
            imageAlt: 'Platzi Music Logo',
            title: 'Escucha la canción que quieras.',
            subTitle: 'Incluso en dispositivos móviles.',
            description: 'Dinos qué te gusta y te recomendaremos la mejor música para ti.',
            icon: 'phone-portrait'
        },
        {
            imageSrc: 'assets/img/logo.png',
            imageAlt: 'Platzi Music Logo',
            title: 'Saltos ilimitados de canciones.',
            subTitle: 'Solo pasa a la siguiente.',
            description: 'Activa el modo Ahorro de datos y consume menos datos cuando escuches tu música.',
            icon: 'play-circle'
        }
    ];

    constructor(
        private router: Router,
        private storage: Storage
    ) {}

    ngOnInit() {}

    finish() {
        this.storage.create();
        this.storage.set('isIntroShowed', true);
        this.router.navigateByUrl('/login');
    }

}
