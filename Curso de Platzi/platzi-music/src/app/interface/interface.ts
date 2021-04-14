export interface SpotifyResponse {
    albums: Albums;
}

interface Albums {
    href: string;
    items: Item[];
    limit: number;
    next: string;
    offset: number;
    previous ? : any;
    total: number;
}

export interface Item {
    album_type: album_type;
    artists: Artist[];
    available_markets: string[];
    external_urls: Externalurls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
}

interface Image {
    height: number;
    url: string;
    width: number;
}

interface Artist {
    external_urls: Externalurls;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}

interface Externalurls {
    spotify: string;
}

type album_type = 'single' | 'album';