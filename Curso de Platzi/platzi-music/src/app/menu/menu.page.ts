import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthenticateService } from '../services/authenticate.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.page.html',
    styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

    constructor(
        private menuCtrl: MenuController,
        private authService: AuthenticateService,
        private router: Router
    ) {}

    ngOnInit() {}

    closeMenu() {
        this.menuCtrl.close();
    }

    logOut() {
        this.authService.logOut().then(() => {
            this.router.navigate(['/login']);
        }).catch(err => this.authService.toastMessage({message: err}));
    }

    goSettings() {
        this.menuCtrl.close();
        this.router.navigate(['menu', 'settings']);
    }

}
