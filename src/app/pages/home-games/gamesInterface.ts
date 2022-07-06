export interface ReturnAPI {
    games: Game[];
    totalSize: number;
}

export interface Game {
    _id: string;
    title: string;
    description: string;
    resume?: string;
    photos: {
        name: string;
        url: string;
        _id: string;
    }[];
    videos: string[];
    genres: string[];
    platforms: string[];
    tags: string[];
    rating: number;
    highlight?: boolean,
    totalVotes: number;
    mediumPrice?: string | number,
    releaseYear: number,
    launchDate: Date,
    createdAt: Date,
    updatedAt: Date,
    __v: number;
}
