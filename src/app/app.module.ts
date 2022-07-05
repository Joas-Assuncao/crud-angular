import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SwiperModule } from 'swiper/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeGamesComponent } from './home-games/home-games.component';
import { FooterComponent } from './footer/footer.component';
import { CardGameComponent } from './card-game/card-game.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthComponent } from './auth/auth.component';
import { GamePageComponent } from './game-page/game-page.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        HomeGamesComponent,
        FooterComponent,
        CardGameComponent,
        AuthComponent,
        GamePageComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        SwiperModule,
        ReactiveFormsModule,
        NgxPaginationModule,

    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
