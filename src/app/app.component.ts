import { Component } from "@angular/core";
import { GetGamesService } from "./get-games.service";
import { Game } from "./home-games/returnAPI";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'vaga-tindin-angular2';
    games!: Game[];

    constructor(private getGamesService: GetGamesService) { }

    onSearch(value: string): void {
        this.getGamesService.getGames().subscribe(({ games }) => (
            this.games = games.filter(game => (
                game.title.toLowerCase().includes(value)
            ))
        ));
    }
}
