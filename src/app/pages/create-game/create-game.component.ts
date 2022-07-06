import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';
import { ICreateGame } from './createGameInterface';

@Component({
    selector: 'app-create-game',
    templateUrl: './create-game.component.html',
    styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent implements OnInit {
    form!: FormGroup;

    body: ICreateGame = {
        title: '',
        description: '',
        photos: [],
        videos: [],
        mediumPrice: 0,
        studio: null,
        company: null,
        releaseYear: 0,
        genres: [],
        platforms: [],
        tags: [],
    };

    genres: string[] = [
        "Fight",
        "Sports",
        "Survival",
        "Horror",
        "RPG",
        "Fps",
        "Tps",
        "Platform",
        "Adventure",
        "Action",
        "Minigame",
        "Racing",
        "Strategy",
        "Musical",
        "Dance",
        "Simulator"
    ];

    platforms: string[] = [
        "PS",
        "PS2",
        "PS3",
        "PS4",
        "PS5",
        "PSP",
        "XBOX",
        "XBOX 360",
        "XBOX ONE",
        "XBOX SERIES S",
        "XBOX SERIES X",
        "SUPER NINTENDO",
        "NINTENDO 64",
        "NINTENDO SWITCH",
        "NINTENDO WII",
        "NINTENDO DS",
        "NINTENDO 3DS",
        "MEGA DRIVE",
        "PC",
        "MOBILE"
    ];
    tags: string[] = [];

    photos: {url: string, name: string}[] = [];
    videos: {url: string, type: string}[] = [];

    haveError: boolean = false;
    params!: any;

    constructor(
        private formBuilder: FormBuilder,
        private gameService: GameService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            title: [''],
            description: [''],
            photos: this.formBuilder.group({
                name: [''],
                url: [''],
            }),
            videos: this.formBuilder.group({
                type: [''],
                url: [''],
            }),
            studio: this.formBuilder.group({
                name: [''],
                locationCity: [''],
                locationCountry: [''],
            }),
            company: this.formBuilder.group({
                name: [''],
                locationCity: [''],
                locationCountry: [''],
            }),
            mediumPrice: [0],
            releaseYear: [0],
            genres: [null],
            platforms: [''],
            tags: [''],
        })

        this.route.params.subscribe((params: any) => this.params = params.id);
    }

    addGenres() {
        if(this.body.genres.includes(this.form.value.genres)) return;

        this.body.genres.push(this.form.value.genres);
    }

    addPlatforms() {
        if(this.body.platforms.includes(this.form.value.platforms)) return;

        this.body.platforms.push(this.form.value.platforms);
    }

    addTags() {
        this.tags.push(this.form.value.tags);
        this.form.patchValue({
            tags: null
        })
    }

    addPhotos() {
        this.photos.push(this.form.value.photos);
        this.form.patchValue({
            photos: {
                url: null,
                name: null
            }
        })
    }

    addVideos() {
        this.videos.push(this.form.value.videos);
        this.form.patchValue({
            videos: {
                url: null,
                type: null
            }
        })
    }

    cancelCreation() {
        this.form.patchValue({
            title: null,
            description: null,
            photos: {
                name: null,
                url: null,
            },
            videos: {
                type: null,
                url: null,
            },
            studio: {
                name: null,
                locationCity: null,
                locationCountry: null,
            },
            company: {
                name: null,
                locationCity: null,
                locationCountry: null,
            },
            mediumPrice: [0],
            releaseYear: [0],
            genres: null,
            platforms: null,
            tags: null,
        });

        this.router.navigate([`/games/${this.params}`]);
    }

    onSubmit() {
        this.body.company = this.form.value.company;
        this.body.description = this.form.value.description;
        this.body.mediumPrice = this.form.value.mediumPrice;
        this.body.releaseYear = this.form.value.releaseYear;
        this.body.studio = this.form.value.studio;
        this.body.title = this.form.value.title;

        this.body.tags = this.tags;
        this.body.photos = this.photos;
        this.body.videos = this.videos;

        const arraysVerification = [
            this.body.genres[0],
            this.body.platforms[0],
            this.body.tags[0],
            this.body.photos[0],
            this.body.videos[0]
        ].every(value => value);

        const fieldsVerification = [
            this.body.company,
            this.body.description,
            this.body.mediumPrice,
            this.body.releaseYear,
            this.body.studio,
            this.body.title
        ].every(value => value);

        if(arraysVerification && fieldsVerification) {
            try {
                this.gameService.postGame(this.body);

                console.log('Game created successfully!');

                this.haveError = false;

                this.router.navigate(['/'])
            } catch (err) {
                console.error(err);
                this.haveError = true;
                return;
            }
        } else {
            this.haveError = true;
            return;
        }
    }
}
