import Media from "../models/Media.js";
import Movie from "../models/Movie.js";
import Tv from "../models/Tv.js";

export default class MediaFactory{

    static build(media){

        if(media.media_type == "movie"){
            return new Movie(media);
        }else if(media.media_type == "tv"){
            return new Tv(media);
        }else{
            return new Media(media);
        }
    }
}