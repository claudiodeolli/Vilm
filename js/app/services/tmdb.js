import { API_BASE, API_KEY } from "../../../environments/environments.js"

export const getTrendingListForTheWeek = async () => {

    const response = await fetch(`${API_BASE}trending/all/week?api_key=${API_KEY}`);
    return response.json();
};

export const getTrendingMedia = async (request) => {

    const response = await fetch(`${API_BASE}trending/${request}?api_key=${API_KEY}`);
    return response.json();
}