import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import SwiperCore, { FreeMode, Navigation, Thumbs } from "swiper";

import { GetGameService } from '../services/get-game.service';
import { IRateGame, RateGameService } from '../services/rate-game.service';
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

    gameById: IGameByID = { game: {
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
    } };
    returnRate!: IRateGame;

    constructor(
        private route: ActivatedRoute,
        private getGameService: GetGameService,
        private rateGameService: RateGameService
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe((params) => this.params = params);
        this.getGameService.getGameById(this.params.id).subscribe(response => this.gameById = response);
    }

    voteInGame() {
        this.isLoading = true;

        this.rateGameService.rateGame().subscribe(response => this.returnRate = response);

        this.isLoading = false;
    }
}
