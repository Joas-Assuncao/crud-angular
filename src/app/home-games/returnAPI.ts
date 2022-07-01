export interface ReturnAPI {
    games: Game[];
    totalSize: number;
}

export interface Game {
    _id: string;
    title: string;
    description: string;
    genres: string[];
    platforms: string[];
    tags: string[];
    rating: number;
    totalVotes: number;
    photos: string[];
    videos: string[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}