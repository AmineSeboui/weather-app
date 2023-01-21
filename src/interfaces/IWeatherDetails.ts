export interface IWeather {
  description: number;
  main: string;
  icon: string;
  id: number;
}

export interface IList {
  clouds: {
    all: number;
  };
  dt: number;
  dt_txt: string;
  visibility: number;
  weather: IWeather[];
  main: {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_kf: number;
    temp_max: number;
    temp_min: number;
  };
  wind: {
    deg: number;
    gust: number;
    speed: number;
  };
}

export interface ICityWeatherDetails {
  city: {
    country: string;
    id: number;
    name: string;
    sunrise: number;
    sunset: number;
    timezone: number;
  };
  list: IList[];
}
