export interface IGameByID {
    game: {
        title: string;
        description: string;
        resume: string;
        photos: {
            name: string;
            url: string;
        }[];
        videos: {
            type: string;
            url: string;
        }[];
        rating: number;
        mediumPrice: number;
        studio: {
            name: string;
            locationCity: string;
            locationCountry: string;
        };
        productor: string;
        totalVotes: number;
        company: {
            name: string;
            locationCity: string;
            locationCountry: string;
        };
        launchDate: Date;
        releaseYear: number;
        highlight: boolean;
        genres: string[];
        platforms: string[];
        tags: string[];
        createdAt: Date;
        updatedAt: Date;
    }
}
