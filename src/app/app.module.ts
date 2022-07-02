import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SwiperModule } from 'swiper/angular';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeGamesComponent } from './home-games/home-games.component';
import { FooterComponent } from './footer/footer.component';
import { CardGameComponent } from './card-game/card-game.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthComponent } from './auth/auth.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        HomeGamesComponent,
        FooterComponent,
        CardGameComponent,
        AuthComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        SwiperModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        SweetAlert2Module.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
