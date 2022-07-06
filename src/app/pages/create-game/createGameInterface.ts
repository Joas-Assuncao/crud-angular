export interface ICreateGame {
    title: string;
    description: string;
    photos: {
        name: string;
        url: string;
    }[] | null[];
    videos: {
        type: string;
        url: string;
    }[] | null[];
    mediumPrice: number;
    studio: {
        name: string;
        locationCity: string;
        locationCountry: string;
    } | null;
    company: {
        name: string;
        locationCity: string;
        locationCountry: string;
    } | null;
    releaseYear: number;
    genres: string[] | null[] | any;
    platforms: string[] | null[] | any;
    tags: string[] | null[] | any;
}
