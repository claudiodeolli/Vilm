import { getTrendingListForTheWeek } from "../services/tmdb.js";
import Midia from "../models/Midia.js";
import ConvertDate from "../helpers/ConvertDate.js";
import MediaFactory from "../services/MediaFactory.js";

export default class TopTrendingMidiaController{

    async getTopTrendingMidiaDetails(){

        const data = await getTrendingListForTheWeek();
        const {
            title, 
            vote_average, 
            first_air_date, 
            backdrop_path,
            overview,
        } = MediaFactory.build(data.results[0]); 
        const release_year = ConvertDate.fullDateForYearOnly(first_air_date);        

        return {
            title, 
            vote_average, 
            release_year,
            backdrop_path,
            overview
        };
    };
}