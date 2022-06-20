export default class Movie{

    #adult;
    #backdrop_path;
    #genre_ids;
    #id;
    #media_type;
    #original_language;
    #original_title;
    #overview;
    #popularity;
    #poster_path;
    #release_date;
    #title;
    #video;
    #vote_average;
    #vote_count;

    constructor({
        adult,
        backdrop_path,
        genre_ids,
        id,
        media_type,
        original_language,
        original_title,
        overview,
        popularity,
        poster_path,
        release_date,
        title,
        video,
        vote_average,
        vote_count,
    }){

        this.#adult = adult,
        this.#backdrop_path = backdrop_path,
        this.#genre_ids = genre_ids,
        this.#id = id,
        this.#media_type = media_type,
        this.#original_language = original_language,
        this.#original_title = original_title,
        this.#overview = overview,
        this.#popularity = popularity,
        this.#poster_path = poster_path,
        this.#release_date = release_date,
        this.#title = title,
        this.#video = video,
        this.#vote_average = vote_average,
        this.#vote_count = vote_count

        Object.freeze(this);
    };

    get id(){

        return this.#id;
    }

    get backdrop_path(){

        return this.#backdrop_path;
    };

    get overview(){

        return this.#overview;
    };

    get popularity(){

        return this.#popularity;
    };

    get poster_path(){

        return this.#poster_path;
    };

    get first_air_date(){

        return this.#release_date;
    };

    get title(){

        return this.#title;
    };

    get vote_average(){

        return this.#vote_average;
    };

    get vote_count(){

        return this.#vote_count;
    };
}