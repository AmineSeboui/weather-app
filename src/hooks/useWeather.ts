import axios from 'axios';
import { IList } from 'interfaces/IWeatherDetails';
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

export const getWeather = async (lat: number, lon: number, unit: string) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_REMOTE_API_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_APP_ID}&units=${unit}`
    );

    const list = data.list.map((item: IList) => {
      return {
        ...item,
        date: format(new Date(item.dt_txt), 'yyyy/MM/dd'),
      };
    });
    const groupedList = _.values(_.groupBy(list, (item) => item.date));

    return { ...data, groupedList: groupedList };
  } catch (error) {
    return [];
  }
};
