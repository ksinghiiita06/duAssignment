import {format} from '../../../common/utils';
import {useCallback, useState} from 'react';
import {getCompleteUrl, POPULAR_MOVIES} from '../../../common/apiConstants';

type responseType = {
  results: movieType[];
};
export type movieType = {
  id: number;
  poster_path: string;
  title: string;
};
// A custom hook to fetch movies data
export const useFetchMovies = () => {
  const [fetching, setFetching] = useState<boolean>(true);
  const [response, setResponse] = useState<responseType>();
  const [error, setError] = useState<Error>();
  const fetchMovies = useCallback(async (language: string) => {
    const completeUrl = getCompleteUrl(format(POPULAR_MOVIES, language));
    try {
      const res = await fetch(completeUrl);
      const data = await res.json();
      setResponse(data);
      setFetching(false);
    } catch (e) {
      if (e instanceof Error) {
        setError(e);
        setFetching(false);
      }
    }
  }, []);

  return {fetching, fetchMovies, response, error};
};
