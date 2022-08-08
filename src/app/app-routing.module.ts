import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/AuthGuard';

import { AuthComponent } from './pages/auth-page/auth.component';
import { CreateGameComponent } from './pages/create-game/create-game.component';
import { EditGameComponent } from './pages/edit-game/edit-game.component';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { HomeGamesComponent } from './pages/home-games/home-games.component';

const routes: Routes = [
    { path: '', component: HomeGamesComponent },
    { path: 'auth', component: AuthComponent },
    {
        path: 'games/create',
        component: CreateGameComponent,
        canActivate: [AuthGuard],
    },
    { path: 'games/:id', component: GamePageComponent },
    {
        path: 'games/edit/:id',
        component: EditGameComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
