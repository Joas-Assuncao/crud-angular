import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IGameByID } from '../game-page/gameInterface';

@Injectable({
    providedIn: 'root'
})
export class GetGameService {

    constructor(private http: HttpClient) { }

    getGameById(gameId: string) {
        return this.http.get<IGameByID>(`${environment.base_URL_API}/games/${gameId}`);
    }
}
