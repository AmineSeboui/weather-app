import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGeoCoding } from 'interfaces/IGeoCoding';

export interface IWeather {
  selectedCity: IGeoCoding;
  unit: string;
}

const initialState: IWeather = {
  selectedCity: {
    country: 'TN',
    name: 'tunis',
    lat: 36.8002,
    lon: 10.1858,
    state: '',
  },
  unit: 'metric',
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    retrieveSearchKeyWord(state, action: PayloadAction<IGeoCoding>) {
      state.selectedCity = action.payload;
    },

    setUnitValue(state, action: PayloadAction<string>) {
      state.unit = action.payload;
    },
  },
});

export const { retrieveSearchKeyWord, setUnitValue } = weatherSlice.actions;

export default weatherSlice.reducer;
