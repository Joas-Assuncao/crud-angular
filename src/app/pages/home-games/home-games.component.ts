import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import SwiperCore, { Navigation } from "swiper";

import { GetGamesService } from '../../services/get-games.service';
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

    constructor(
        private router: Router,
        private getGamesService: GetGamesService
    ) { }

    ngOnInit(): void {
        try {
            this.getGamesService.getGames().subscribe(data => {
                this.data = data;
                this.games = data.games.map(game => (
                    {
                        ...game,
                        mediumPrice: game.mediumPrice === 0 ?
                            '' :
                            game.mediumPrice?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
                        rating: Number(game.rating.toFixed(2))
                    }
                ));

                this.highlightGames = data.games.filter(game => (
                    game.highlight === true
                ));
            });
        } catch(err) {
            console.error(err);
        }
    }

    onSearch(value: string): void {
        this.getGamesService.getGames().subscribe(({ games }) => (
            this.games = games.filter(game => (
                game.title.toLowerCase().includes(value)
            ))
        ));
    }

    createGame() {
        this.router.navigate(['/games/create']);
    }
}
