import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ReturnAPI } from '../pages/home-games/gamesInterface';

@Injectable({
    providedIn: 'root'
})
export class GetGamesService {

    constructor(private http: HttpClient) { }

    getGames() {
        return this.http.get<ReturnAPI>(`${environment.base_URL_API}/games`);
    }
}
