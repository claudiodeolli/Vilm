export default class Media{

    #backdrop_path;
    #first_air_date;
    #genre_ids;
    #id;
    #name;
    #origin_country;
    #original_language;
    #original_name;
    #overview;
    #popularity;
    #poster_path;
    #vote_average;
    #vote_count;

    constructor({
        backdrop_path,
        first_air_date,
        genre_ids,
        id,
        name,
        origin_country,
        original_language,
        original_name,
        overview,
        popularity,
        poster_path,
        vote_average,
        vote_count 
    }){

        this.#backdrop_path = backdrop_path;
        this.#first_air_date = first_air_date;
        this.#genre_ids = genre_ids;
        this.#id = id;
        this.#name = name;
        this.#origin_country = origin_country;
        this.#original_language = original_language;
        this.#original_name = original_name;
        this.#overview = overview;
        this.#popularity = popularity;
        this.#poster_path = poster_path;
        this.#vote_average = vote_average;
        this.#vote_count = vote_count;
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

        return this.#first_air_date;
    };

    get title(){

        return this.#name;
    };

    get vote_average(){

        return this.#vote_average;
    };

    get vote_count(){

        return this.#vote_count;
    };
};