import { getTrendingMedia } from "../services/tmdb.js";
import MediaList from "../models/MediaList.js";
import Midia from "../models/Midia.js";
import Movie from "../models/Movie.js";
import Tv from "../models/Tv.js";

export default class MediaListController{

    async createMediaList(request){

        //tipar aqui
        const {results} = await getTrendingMedia(request);

        let mediaList = [];
        results.forEach(item => {

            if(item.media_type == "movie"){
                mediaList.push(new Movie(item));
            }else if(item.media_type == "tv"){
                mediaList.push(new Tv(item));
            }            
        });

        return new MediaList(mediaList);
    };
};
