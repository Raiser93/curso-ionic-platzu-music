import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {

    constructor(private storage: Storage, private router: Router) {}

    async canActivate() {

        try {
            
            this.storage.create();
    
            const isUserLoggedIn = await this.storage.get('isUserLoggedIn');

            if (isUserLoggedIn) {
                return true;
            } else {
                this.router.navigateByUrl('/login');
                return false;
            }
        } catch (error) {
            this.router.navigateByUrl('/login');
            return false;
        }
    }

}
