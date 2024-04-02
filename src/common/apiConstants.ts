export const POSTER_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original/';
export const API_KEY = '8270e7bad290a51dc4b7c2a981aa09a4';
export const BASE_URL = 'https://api.themoviedb.org';
export const API_VERSION = 3;

export const POPULAR_MOVIES = `movie/popular?api_key=${API_KEY}&language={0}&page=1`;

export const getCompleteUrl = (url: string) =>
  `${BASE_URL}/${API_VERSION}/${url}`;
