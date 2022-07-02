import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeGamesComponent } from './home-games/home-games.component';

const routes: Routes = [
    { path: '', component: HomeGamesComponent},
    { path: 'auth', component: AuthComponent},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
