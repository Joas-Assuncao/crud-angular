import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export interface IRateGameReturn {
    game: string;
    rating: number;
    totalVotes: number;
}

export interface IRateGameBody {
    gameId: string;
    rate: number;
}

@Injectable({
    providedIn: 'root',
})
export class RateGameService {
    constructor(private http: HttpClient) {}

    rateGame({ gameId, rate }: IRateGameBody) {
        return this.http.post<IRateGameReturn>(
            `${environment.base_URL_API}/games/rate`,
            {
                gameId,
                rate,
            }
        );
    }
}
