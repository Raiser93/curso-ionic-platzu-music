import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticateService } from '../services/authenticate.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    registerForm: FormGroup;
    validationMessage = {
        email: [
            { type: 'required', message: 'El email es requerido' },
            { type: 'pattern', message: 'Este no es un email valido' }
        ],
        password: [
            { type: 'required', message: 'La contraseña es requerida' },
            { type: 'minlength', message: 'La contraseña debe tener 5 caracteres como minimo' }
        ],
        passconfirm: [
            { type: 'required', message: 'La contraseña es requerida' },
        ],
        name: [
            { type: 'required', message: 'El nombre es requerido' },
            { type: 'pattern', message: 'Nombre no valido' },
            { type: 'minlength', message: 'El nombre debe tener 2 caracteres como minimo' }
        ]
    }

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthenticateService
    ) {
        this.registerForm = this.formBuilder.group({
            name: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('[a-zA-Z ]+'),
                Validators.minLength(2),
            ])),
            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.email,
                Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
            ])),
            password: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(5)
            ])),
            passconfirm: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(5)
            ])),
        }, {
            validator: this.matchingPassword('password', 'passconfirm')
        });
    }

    ngOnInit() {}

    matchingPassword(passwordKey: string, confirmPasswordKey:  string) {
        return (group: FormGroup): {[key: string]: any} => {
            let password = group.controls[passwordKey];
            let confirmPassword = group.controls[confirmPasswordKey];

            if (password.value !== confirmPassword.value) {
                return {
                    mismatchedPasswords: true
                }
            }
        }
    }

    registerUser(credentials) {
        console.log(credentials);
        if (this.registerForm.invalid) {
            return;
        }
        
        if (this.authService.users.find(u => u.email === credentials.email)) {
            this.authService.toastMessage({
                message: 'El email ya fue registrado'
            })
            return;
        }
        
        this.registerForm.setValue({
            name: '',
            email: '',
            password: '',
            passconfirm: '',
        });

        this.authService.register(credentials);
    }


}
