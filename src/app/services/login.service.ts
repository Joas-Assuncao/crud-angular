import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface ILoginParams {
    email: string;
    password: string;
}

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(
        private http: HttpClient
    ) { }

    login({ email, password }: ILoginParams) {
        console.log({ login: 'login', email, password })
        const returnPost = this.http.post(`${environment.base_URL_API}/auth`, {
            email,
            password
        });

        return returnPost;
    }

    getToken(): string | boolean {
        const token = localStorage.getItem('token');
        return token ? token : false;
    }

    isAutenticated() {
        return this.getToken() ? false : true;
    }
}
