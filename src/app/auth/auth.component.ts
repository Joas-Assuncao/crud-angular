import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
    form: any;

    isEmpty: boolean = false;
    isShort: boolean = false;
    isLogged: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private loginService: LoginService
    ) { }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            email: [null, [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(35)]],
            password: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]]
        })
    }


    onSubmit(): void {
        this.isLogged = true;

        const { email, password } = this.form.value;

        if(!email || !password) {
            this.isEmpty = true;
            return;
        }

        if(email.length <= 10 || password.length <= 2) {
            this.isShort = true;
            return;
        }

        if(this.isEmpty === false && this.isShort === false) {
            const isLogged = this.loginService.login({ email, password });
            isLogged.subscribe((value: any) => {
                localStorage.setItem('validation', JSON.stringify({ token: value.token, userId: value.user._id }))
            });
            return;
        }


    }
}
