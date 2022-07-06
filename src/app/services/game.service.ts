import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICreateGame } from '../pages/create-game/createGameInterface';
import { IEditGame } from '../pages/edit-game/editGameInterface';
import { IGameByID } from '../pages/game-page/gameInterface';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    constructor(private http: HttpClient) { }

    getGameById(gameId: string) {
        return this.http.get<IGameByID>(`${environment.base_URL_API}/games/${gameId}`);
    }

    deleteGame(gameId: string) {
        this.http.delete(`${environment.base_URL_API}/games/${gameId}`);
    }

    postGame(body: ICreateGame) {
        return this.http.post<IGameByID>(`${environment.base_URL_API}/games`, body);
    }

    updateGame(body: IEditGame) {
        return this.http.put(`${environment.base_URL_API}/games`, body);
    }
}
