import axios from "axios";

const base_url = `https://www.googleapis.com/youtube/v3/`;
const RapidBaseUrl = `https://yt-api.p.rapidapi.com/`;
const API_KEY = String(import.meta.env.VITE_YOUTUBE_DATA_V3_API_KEY);

const options = {
    method: 'GET',
    params: {
        geo: 'IN'
    },
    headers: {
        'X-RapidAPI-Key': String(import.meta.env.VITE_YOUTUBE_CLONE_API_KEY),
        'X-RapidAPI-Host': 'yt-api.p.rapidapi.com'
    }
}


export const fetchDataFromApi = async (url) => {
    const { data } = await axios.get(`${base_url}${url}&key=${API_KEY}`)
    return data;
}

export const fetchDataFromRapidApi = async (url) => {
    const { data } = await axios.get(`${RapidBaseUrl}${url}`, options)
    return data;
}



