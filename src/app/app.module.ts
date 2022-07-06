import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SwiperModule } from 'swiper/angular';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeGamesComponent } from './pages/home-games/home-games.component';
import { FooterComponent } from './components/footer/footer.component';
import { CardGameComponent } from './components/card-game/card-game.component';
import { AuthComponent } from './pages/auth-page/auth.component';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { CreateGameComponent } from './pages/create-game/create-game.component';
import { EditGameComponent } from './pages/edit-game/edit-game.component';
import { AuthGuard } from './guards/AuthGuard';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        HomeGamesComponent,
        FooterComponent,
        CardGameComponent,
        AuthComponent,
        GamePageComponent,
        CreateGameComponent,
        EditGameComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        SwiperModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        FormsModule,
    ],
    providers: [AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule { }
