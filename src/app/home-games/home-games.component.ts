import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { tap } from 'rxjs';
import SwiperCore, { Navigation } from "swiper";

import { GetGamesService } from '../get-games.service';
import { Game, ReturnAPI } from './returnAPI';

SwiperCore.use([Navigation]);

@Component({
    selector: 'app-home-games',
    templateUrl: './home-games.component.html',
    styleUrls: ['./home-games.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class HomeGamesComponent implements OnInit {
    data!: ReturnAPI;
    games!: Game[];
    valueSearch: string = '';

    constructor(private getGamesService: GetGamesService) { }

    ngOnInit(): void {
        this.getGamesService.getGames().subscribe(data => {
            this.data = data;
            this.games = data.games;
        });
    }

    onSearch(value: string): void {
        this.getGamesService.getGames().subscribe(({ games }) => (
            this.games = games.filter(game => (
                game.title.toLowerCase().includes(value)
            ))
        ));
    }
}
