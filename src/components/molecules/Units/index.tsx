import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  makeStyles,
  Radio,
  RadioGroup,
  styled,
} from '@mui/material';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUnitValue } from 'store/weatherSlice';

const AppTitle = styled(FormLabel)({
  color: 'white !important',
  fontSize: 48,
  fontWeight: 'bold',
});

const AppCheckBoxs = styled(RadioGroup)({
  display: 'flex',
  justifyContent: 'space-evenly',
  color: 'white',
});

const AppRadio = styled(Radio)({
  color: 'white',
});

const UnitsComponent: FC = () => {
  const dispatch = useDispatch();

  const [selectedValue, setSelectedValue] = useState<string>('metric');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedValue(event.target.value);
    dispatch(setUnitValue(event.target.value));
  };

  return (
    <Grid item md container justifyContent={'center'}>
      <Grid item xs={6} justifyContent={'center'} alignItems={'center'}>
        <FormControl fullWidth color="primary">
          <AppTitle id="units-component-title">Weather App</AppTitle>
          <AppCheckBoxs row name="position" defaultValue="top">
            <FormControlLabel
              value="metric"
              control={
                <AppRadio
                  checked={selectedValue === 'metric'}
                  onChange={handleChange}
                />
              }
              label="Celcius"
            />
            <FormControlLabel
              value="imperial"
              control={
                <AppRadio
                  checked={selectedValue === 'imperial'}
                  onChange={handleChange}
                />
              }
              label="Fahrenheit"
            />
          </AppCheckBoxs>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default UnitsComponent;
