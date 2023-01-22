import axios from 'axios';
import { IGeoCoding } from 'interfaces/IGeoCoding';
import { ICityWeatherDetails } from 'interfaces/IWeatherDetails';
import { useMemo } from 'react';
import { createUrl } from 'utils/fetch';
import { useFetch } from './useFetch';
import { useAppSelector } from './useStore';
import _ from 'lodash';
import { format } from 'date-fns';

export const getGeoLocation = async (searchKeyWord: string) => {
  try {
    const { data } = await axios.get(
      `${
        process.env.REACT_APP_REMOTE_API_URL
      }/geo/1.0/direct?q=${searchKeyWord.toLowerCase()}&limit=10&appid=${
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
    format: (data) => {
      const list = data.list.map((item) => {
        return {
          ...item,
          date: format(new Date(item.dt_txt), 'yyyy/MM/dd'),
        };
      });
      const groupedList = _.values(_.groupBy(list, (item) => item.date));

      /* const weatherDetailsPerDay = groupedList?.map((item) => {
         console.log('item', item);
        return {
          ...item,
          icon: item[0].weather[0].icon,
          iconDescription: item[0].weather[0].description,
          date: item[0].date,
          avg_temp: item?.reduce(
            (prev, curr, i, l) => prev + curr.main.temp / l.length,
            0
          ),
        };
      }); */

      return { ...data, groupedList: groupedList };
    },
  });
};
