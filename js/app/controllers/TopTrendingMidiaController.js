import { getTrendingListForTheWeek } from "../services/tmdb.js";
import Midia from "../models/Midia.js";
import ConvertDate from "../helpers/ConvertDate.js";

export default class TopTrendingMidiaController{

    async getTopTrendingMidiaDetails(){

        const data = await getTrendingListForTheWeek();
        const {
            name, 
            vote_average, 
            first_air_date, 
            backdrop_path,
            overview,
        } = new Midia(data.results[0]); 
        const release_year = ConvertDate.fullDateForYearOnly(first_air_date);        

        return {
            name, 
            vote_average, 
            release_year,
            backdrop_path,
            overview
        };
    };
}