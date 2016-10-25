import axios from 'axios';

const API_KEY = 'af764c51b9dd9d9fa960130f2aad6ab2';
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appId=${API_KEY}`;

export const FETCH_WEATHER = 'FETCH_WEATHER';

export function fetchWeather(city){
  const url = `${ROOT_URL}&q=${city},us`;
  const request = axios.get(url);// returns a promise

  // redux-promise will convert promise to data in middleware

  return {
    type: FETCH_WEATHER,
    payload: request
  }
}
