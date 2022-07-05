import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import SwiperCore, { Navigation } from "swiper";

import { GetGamesService } from '../services/get-games.service';
import { Game, ReturnAPI } from './gamesInterface';

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
    highlightGames!: Game[];

    valueSearch: string = '';

    p: number = 1;

    constructor(private getGamesService: GetGamesService) { }

    ngOnInit(): void {
        this.getGamesService.getGames().subscribe(data => {
            this.data = data;
            this.games = data.games.map(game => (
                {
                    ...game,
                    mediumPrice: game.mediumPrice?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                }
            ));

            this.highlightGames = data.games.filter(game => (
                game.highlight === true
            ));
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
