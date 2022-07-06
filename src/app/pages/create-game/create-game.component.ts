import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
        photos: [null],
        videos: [null],
        mediumPrice: 0,
        studio: null,
        company: null,
        releaseYear: 0,
        genres: [null],
        platforms: [null],
        tags: [null],
    };

    genres: string[] = [];
    platforms: string[] = [];
    tags: string[] = [];

    photos: {url: string, name: string}[] = [];
    videos: {url: string, type: string}[] = [];

    haveError: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private gameService: GameService,
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
            genres: [''],
            platforms: [''],
            tags: [''],
        })
    }

    addGenres() {
        this.genres.push(this.form.value.genres);
        this.form.patchValue({
            genres: null
        })
        console.log(this.genres);
    }

    addPlatforms() {
        this.platforms.push(this.form.value.platforms);
        this.form.patchValue({
            platforms: null
        })
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

    onSubmit() {
        this.body.company = this.form.value.company;
        this.body.description = this.form.value.description;
        this.body.mediumPrice = this.form.value.mediumPrice;
        this.body.releaseYear = this.form.value.releaseYear;
        this.body.studio = this.form.value.studio;
        this.body.title = this.form.value.title;

        this.body.genres = this.genres;
        this.body.platforms = this.platforms;
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

                this.router.navigate(['/'])
            } catch (err) {
                console.error(err);
            }
        } else {
            this.haveError = true;
        }
    }
}
