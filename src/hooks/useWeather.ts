import axios from 'axios';
import { IGeoCoding } from 'interfaces/IGeoCoding';
import { ICityWeatherDetails } from 'interfaces/IWeatherDetails';
import { useMemo } from 'react';
import { createUrl } from 'utils/fetch';
import { useFetch } from './useFetch';
import { useAppSelector } from './useStore';

export const getGeoLocation = async (searchKeyWord: string) => {
  try {
    const { data } = await axios.get(
      `${
        process.env.REACT_APP_REMOTE_API_URL
      }/geo/1.0/direct?q=${searchKeyWord.toLowerCase()}&limit=5&appid=${
        process.env.REACT_APP_WEATHER_APP_ID
      }`
    );

    return data;
  } catch (error) {
    return [];
  }
};

export const useWeather = () => {
  const { selectedCity, unit } = useAppSelector(({ weather }) => weather);

  const url = useMemo<string>(() => {
    const queryString = {
      lat: selectedCity?.lat,
      lon: selectedCity?.lon,
      appid: process.env.REACT_APP_WEATHER_APP_ID,
      units: unit,
    };

    return createUrl(
      process.env.REACT_APP_REMOTE_API_URL ?? '',
      ['data', '2.5', 'forecast'],
      queryString
    );
  }, [selectedCity?.lat, selectedCity?.lon, unit]);

  return useFetch<ICityWeatherDetails>({
    key: ['weather'],
    url,
    options: {
      enabled: !!selectedCity,
    },
  });
};
