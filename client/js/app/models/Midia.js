export default class Midia{

    #overview; 
    #id;
    #backdrop_path;
    #genre_ids;
    #vote_count;
    #original_language;
    #vote_average;
    #poster_path;
    #first_air_date;
    #name;
    #origin_country;
    #original_name; 
    #popularity; 
    #media_type;


    constructor({
        overview, 
        id, 
        backdrop_path, 
        genre_ids, 
        vote_count, 
        original_language, 
        vote_average, 
        poster_path,
        first_air_date,
        name,
        origin_country,
        original_name,
        popularity,
        media_type}){

            this.#overview = overview;
            this.#id = id;
            this.#backdrop_path = backdrop_path;
            this.#genre_ids = genre_ids;
            this.#vote_count = vote_count;
            this.#original_language = original_language;
            this.#vote_average = vote_average;
            this.#poster_path = poster_path;
            this.#first_air_date = first_air_date;
            this.#name = name;
            this.#origin_country = origin_country;
            this.#original_name = original_name;
            this.#popularity = popularity;
            this.#media_type = media_type;

            Object.freeze(this);
    };

    get overview(){

        return this.#overview;
    };

    get backdrop_path(){

        return this.#backdrop_path;
    };

    get first_air_date(){

        return this.#first_air_date;
    }

    get vote_average(){

        return this.#vote_average;
    };

    get poster_path(){

        return this.#poster_path;
    };

    get title(){

        return this.#name;
    };

    get media_type(){

        return this.#media_type;
    };

    get id(){

        return this.#id;
    };
}