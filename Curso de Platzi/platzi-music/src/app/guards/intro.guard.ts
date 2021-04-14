import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class IntroGuard implements CanActivate {

    constructor(private storage: Storage, private router: Router) {}

    async canActivate() {

        try {
            
            this.storage.create();
    
            const intro = await this.storage.get('isIntroShowed');

            if (intro) {
                return true;
            } else {
                this.router.navigateByUrl('/intro');
                return false;
            }
        } catch (error) {
            this.router.navigateByUrl('/intro');
            return false;
        }
    }

}
