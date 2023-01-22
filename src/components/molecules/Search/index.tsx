import {
  Autocomplete,
  Box,
  CircularProgress,
  Grid,
  TextField,
} from '@mui/material';
import { getGeoLocation, useAppSelector } from 'hooks';
import { IGeoCoding } from 'interfaces/IGeoCoding';
import { FC, Fragment, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { retrieveSearchKeyWord } from 'store/weatherSlice';

const SearchComponent: FC = () => {
  const dispatch = useDispatch();
  const { selectedCity } = useAppSelector(({ weather }) => weather);

  const [value, setValue] = useState<IGeoCoding | null>(selectedCity);
  const [inputValue, setInputValue] = useState(selectedCity.name);

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly IGeoCoding[]>([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    getGeoLocation(inputValue).then((res) => setOptions([...res]));
  }, [inputValue]);

  return (
    <Autocomplete
      id="search"
      value={value}
      onChange={(event: SyntheticEvent, newValue: IGeoCoding | null) => {
        setValue(newValue);
        if (newValue) dispatch(retrieveSearchKeyWord(newValue));
      }}
      inputValue={inputValue}
      onInputChange={(event: SyntheticEvent, newInputValue: string) => {
        setInputValue(newInputValue);
      }}
      sx={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.country.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.country.toLowerCase()}.png 2x`}
            alt=""
          />
          {option?.name} ({option?.country}) {option?.state}
        </Box>
      )}
      isOptionEqualToValue={(option, value) => {
        return option?.name === value?.name;
      }}
      getOptionLabel={(option) => option?.name}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search by City..."
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default SearchComponent;
