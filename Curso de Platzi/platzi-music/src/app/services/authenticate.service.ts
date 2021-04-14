import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class AuthenticateService {

    users: any[] = [];

    constructor(
        private storage: Storage,
        private router: Router,
        private toastCtrl: ToastController
    ) {
        this.loadUsers();
    }

    async loadUsers() {
        this.storage.create();
        const users = await this.storage.get('usersPlatziMusic');

        if (users) {
            this.users.push(...users);
        }

        return this.users;
    }

    loginUser({email, password}) {
        return new Promise(async (accept, reject) => {
            const users = await  this.loadUsers();
            const user = users.find(u => u.email === email);
            if (user) {
                if (atob(user.password) === password) {
                    accept('');
                } else {
                    reject('Credenciales incorrectas');
                }
            } else {
                reject('Email no registrado');
            }
        });
    }

    register(credentials) {
        this.users.push({
            name: credentials.name,
            email: credentials.email,
            password: btoa(credentials.password)
        });

        this.storage.create();
        this.storage.set('usersPlatziMusic', this.users);
        
        this.router.navigate(['/login'], {skipLocationChange: true});
    }

    logOut() {
        return new Promise((resolve, reject) => {
            this.storage.create();
            this.storage.set('isUserLoggedIn', false);
            resolve('');
        });
    }
    
    async toastMessage({message}) {
        const toast = await this.toastCtrl.create({
            message,
            duration: 2000
        });
        toast.present();
    }
}
