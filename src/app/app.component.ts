import { Component } from "@angular/core";
import { GetGamesService } from "./services/get-games.service";
import { Game } from "./home-games/gamesInterface";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
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
