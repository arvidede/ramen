export interface PhotoType {
    location: string
    name: string
    place: string
    src: string
}

export const GOOGLE_PLACES_BASE_URL = 'https://gallery-places-query.edenheim.workers.dev/?input='

export const GOOGLE_MAPS_BASE_URL = 'https://www.google.com/maps/place/?q=place_id:'



export interface SearchResult {
    predictions: Prediction[];
    status:      string;
}

export interface Prediction {
    description:           string;
    matched_substrings:    MatchedSubstring[];
    place_id:              string;
    reference:             string;
    structured_formatting: StructuredFormatting;
    terms:                 Term[];
    types:                 string[];
}

export interface MatchedSubstring {
    length: number;
    offset: number;
}

export interface StructuredFormatting {
    main_text:                    string;
    main_text_matched_substrings: MatchedSubstring[];
    secondary_text:               string;
}

export interface Term {
    offset: number;
    value:  string;
}