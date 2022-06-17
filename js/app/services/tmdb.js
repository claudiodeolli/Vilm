import { API_BASE, API_KEY } from "../../../environments/environments.js"

export const getTrendingMovies = async () => {

    const response = await fetch(`${API_BASE}trending/all/day?api_key=${API_KEY}`);
    return response.json();
};