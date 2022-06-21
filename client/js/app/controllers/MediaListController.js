import { getTrendingMedia } from "../services/tmdb.js";
import MediaList from "../models/MediaList.js";
import Midia from "../models/Media.js";
import Movie from "../models/Movie.js";
import Tv from "../models/Tv.js";
import MediaFactory from "../services/MediaFactory.js";

export default class MediaListController{

    async createMediaList(results){

        let mediaList = [];
        results.forEach(item => {

            mediaList.push(MediaFactory.build(item));      
        });

        return new MediaList(mediaList);
    };
};
