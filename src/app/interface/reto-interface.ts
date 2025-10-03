export interface RetoResponse {
    info:    Info;
    results: Result[];
    error?:   boolean; // 👈 para manejar errores desde el service
}

export interface Info {
    count: number;
    pages: number;
    next:  string;
    prev:  null;
}

export interface Result {
    id:       number;
    name:     string;
    status:   Status;
    species:  Species;
    type:     Type;
    gender:   Gender;
    origin:   Location;
    location: Location;
    image:    string;
    episode:  string[];
    url:      string;
    created:  Date; 
}

export enum Gender {
    Male = "Male",
    Unknown = "unknown",
}

export interface Location {
    name: string;
    url:  string;
}

export enum Species {
    Alien = "Alien",
    Cronenberg = "Cronenberg",
    Human = "Human",
    Humanoid = "Humanoid",
}

export enum Status {
    Alive = "Alive",
    Dead = "Dead",
    Unknown = "unknown",
}

export enum Type {
    Empty = "",
    FishPerson = "Fish-Person",
    HumanWithAntennae = "Human with antennae",
    HumanWithGiantHead = "Human with giant head",
}
