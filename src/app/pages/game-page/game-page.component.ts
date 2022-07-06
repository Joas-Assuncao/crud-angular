import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import SwiperCore, { FreeMode, Navigation, Thumbs } from "swiper";

import { GameService } from '../../services/game.service';
import { IRateGameReturn, RateGameService } from '../../services/rate-game.service';
import { IGameByID } from './gameInterface';

SwiperCore.use([FreeMode, Navigation, Thumbs]);

@Component({
    selector: 'app-game-page',
    templateUrl: './game-page.component.html',
    styleUrls: ['./game-page.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class GamePageComponent implements OnInit {
    params!: any;
    thumbsSwiper: any;

    isLoading: boolean = false;
    isVoting: boolean = false;
    isEdit: boolean = false;
    haveAutentication: boolean = false;

    valueOfRate!: number;

    gameById: IGameByID = {
        game: {
            title: '',
            description: '',
            resume: '',
            photos: [{
                name: '',
                url: '',
            }],
            videos: [{
                type: '',
                url: '',
            }],
            rating: 0,
            mediumPrice: 0,
            studio: {
                name: '',
                locationCity: '',
                locationCountry: '',
            },
            productor: '',
            totalVotes: 0,
            company: {
                name: '',
                locationCity: '',
                locationCountry: '',
            },
            launchDate: new Date(),
            releaseYear: 0,
            highlight: false,
            genres: [''],
            platforms: [''],
            tags: [''],
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    };
    returnRate!: IRateGameReturn;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private gameService: GameService,
        private loginService: LoginService,
        private rateGameService: RateGameService
    ) { }

    ngOnInit(): void {
        try{
            this.route.params.subscribe((params: any) => this.params = params.id);
            this.gameService.getGameById(this.params).subscribe(response => {
                this.gameById = response
                this.gameById.game.rating = Number(this.gameById.game.rating.toFixed(2))
            });
        } catch(err) {
            console.error(err);
        }

        this.haveAutentication = this.loginService.isAutenticated();
    }

    voteInGame() {
        this.isLoading = true;
        this.isVoting = true;
    }

    sendRating(value: string | undefined) {
        console.log({params: this.params, value: Number(value)})
        this.rateGameService.rateGame({ gameId: this.params, rate: Number(value) }).subscribe(
            ({ ratingUpdated, totalVotes }: any) => (
                this.gameById.game.rating = Number(ratingUpdated.toFixed(2)),
                this.gameById.game.totalVotes = totalVotes
            )
        )

        this.isLoading = false;
        this.isVoting = false;
    }

    editGame() {
        this.router.navigate([`/games/edit/${this.params}`]);
    }

    createGame() {
        this.router.navigate(['/games/create']);
    }

    deleteGame() {
        this.gameService.deleteGame(this.params);
    }
}
