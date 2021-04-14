import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../services/authenticate.service';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    loginForm: FormGroup;
    validationMessage = {
        email: [
            { type: 'required', message: 'El email es requerido' },
            { type: 'pattern', message: 'Este no es un email valido' }
        ],
        password: [
            { type: 'required', message: 'La contraseña es requerida' },
            { type: 'minlength', message: 'La contraseña debe tener 5 caracteres como minimo' }
        ]
    }

    errorMessage: string = '';

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthenticateService,
        private storage: Storage
    ) {
        this.loginForm = this.formBuilder.group({
            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.email,
                Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
            ])),
            password: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(5)
            ])),
        });
    }

    ngOnInit() {}

    loginUser(credentials) {
        this.authService.loginUser(credentials).then(res => {
            this.errorMessage = '';
            this.storage.create(),
            this.storage.set('isUserLoggedIn', true);
            this.router.navigate(['/menu/home']);
        }).catch(err => this.authService.toastMessage({message: err}));
    }

}
