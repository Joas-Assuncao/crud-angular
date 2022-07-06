import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-card-game',
    templateUrl: './card-game.component.html',
    styleUrls: ['./card-game.component.scss']
})
export class CardGameComponent implements OnInit {
    @Input() game: any;
    constructor() { }

    ngOnInit(): void {
    }

}
