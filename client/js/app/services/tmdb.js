import { API_BASE, API_KEY } from "../../../environments/environments.js"

export const getTrendingListForTheWeek = async () => {

    const response = await fetch(`${API_BASE}trending/all/week?api_key=${API_KEY}`);
    return response.json();
};

export const getTrendingMedia = async (request) => {

    const response = await fetch(`${API_BASE}trending/${request}?api_key=${API_KEY}`);
    return response.json();
};

export const getMediaById = async (id, mediaType) => {

    var response;
    if(mediaType == 'tv'){

        response = await fetch(`${API_BASE}tv/${id}?api_key=${API_KEY}&language=en-US`);
    }else if(mediaType == 'movie'){

        response = await fetch(`${API_BASE}movie/${id}?api_key=${API_KEY}&language=en-US`)
    };

    return response.json();
};

export const searchMedia = async (query, page) => {

    const response = await fetch(`${API_BASE}search/multi?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}&&include_adult=false`);
    let {results, total_pages} = await response.json();
    
    let mediaList = results.map(item => {
        
        if(item.media_type == "tv" || item.media_type == "movie"){
            return item;
        }
    }).filter(item => item !== undefined);

    return {mediaList, total_pages};
};