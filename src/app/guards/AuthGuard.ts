import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { LoginService } from '../services/login.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private loginService: LoginService, private router: Router) {}

    canActivate() {
        if (this.loginService.isAutenticated()) {
            return true;
        } else {
            this.router.navigate(['/auth']);

            return false;
        }
    }
}
