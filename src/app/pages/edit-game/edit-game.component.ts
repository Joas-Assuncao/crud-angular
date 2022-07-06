import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';
import { IEditGame } from './editGameInterface';

@Component({
    selector: 'app-edit-game',
    templateUrl: './edit-game.component.html',
    styleUrls: ['./edit-game.component.scss']
})
export class EditGameComponent implements OnInit {
    form!: FormGroup;

    body: IEditGame = {
        _id: '',
        description: '',
        releaseYear: 0,
        mediumPrice: 0,
        launchDate: null
    };

    genres: string[] = [];
    platforms: string[] = [];
    tags: string[] = [];

    photos: {url: string, name: string}[] = [];
    videos: {url: string, type: string}[] = [];

    haveError: boolean = false;
    nameGame: string = '';

    constructor(
        private formBuilder: FormBuilder,
        private gameService: GameService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            releaseYear: [0],
            mediumPrice: [0],
            description: null,
            launchDate: null
        })

        this.route.params.subscribe((params: any) => this.body._id = params.id);
        this.gameService.getGameById(this.body._id).subscribe(({ game }) => this.nameGame = game.title)
    }

    addGenres() {
        this.genres.push(this.form.value.genres);
        this.form.patchValue({
            genres: null
        })
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

    cancelEdition() {
        this.form.patchValue({
            releaseYear: [0],
            description: null,
            mediumPrice: [0],
            launchDate: [null]
        });

        this.router.navigate([`/games/${this.body._id}`]);
    }

    onSubmit() {
        this.body.description = this.form.value.description;
        this.body.releaseYear = this.form.value.releaseYear;
        this.body.mediumPrice = this.form.value.mediumPrice;
        this.body.launchDate = this.form.value.launchDate;

        const fieldsVerification = [
            this.body._id,
            this.body.description,
            this.body.releaseYear,
            this.body.mediumPrice,
            this.body.launchDate,
        ].every(value => value);

        if(fieldsVerification) {
            try {
                this.gameService.updateGame(this.body);
                console.log('Game edited successfully!');

                this.haveError = false;

                this.router.navigate([`/games/${this.body._id}`]);
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
