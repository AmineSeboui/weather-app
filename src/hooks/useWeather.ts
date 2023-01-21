/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { IGeoCoding } from 'interfaces/IGeoCoding';
import { ICityWeatherDetails } from 'interfaces/IWeatherDetails';
import { useMemo } from 'react';
import { createUrl } from 'utils/fetch';
import { useFetch } from './useFetch';

export const useGeocoding = (city: string) => {
  const url = useMemo<string>(() => {
    const queryString = {
      q: city.toLowerCase(),
      limit: 5,
      appid: process.env.REACT_APP_WEATHER_APP_ID,
    };

    return createUrl(
      process.env.REACT_APP_REMOTE_API_URL ?? '',
      ['geo', '1.0', 'direct'],
      queryString
    );
  }, []);

  return useFetch<IGeoCoding[]>({
    key: ['geocoding'],
    url,
    format: (data) =>
      data?.filter((item: IGeoCoding) => item?.state?.toLowerCase() === city) ??
      [],
  });
};

export const useWeather = (
  lat: number | undefined,
  lon: number | undefined
) => {
  const url = useMemo<string>(() => {
    const queryString = {
      lat: lat,
      lon: lon,
      appid: process.env.REACT_APP_WEATHER_APP_ID,
      units: 'metric',
    };

    return createUrl(
      process.env.REACT_APP_REMOTE_API_URL ?? '',
      ['data', '2.5', 'forecast'],
      queryString
    );
  }, [lat, lon]);

  return useFetch<ICityWeatherDetails>({
    key: ['weather'],
    url,
    options: {
      enabled: !!lat || !!lon,
    },
  });
};
