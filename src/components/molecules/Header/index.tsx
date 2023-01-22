import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Icon,
  makeStyles,
  Radio,
  RadioGroup,
  styled,
} from '@mui/material';
import { format } from 'date-fns';
import { useWeather } from 'hooks';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUnitValue } from 'store/weatherSlice';
import SearchComponent from '../Search';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { toHours } from 'utils';

const CurrentHour = styled(FormLabel)({
  color: '#5c92ff !important',
  fontSize: 48,
  fontWeight: 'bold',
  display: 'flex',
});

const CurrentDate = styled(FormLabel)({
  color: '#474f72 !important',
  fontSize: 26,
  fontWeight: 'bold',
});

const CityName = styled(FormLabel)({
  color: '#5c92ff !important',
  fontSize: 28,
  fontWeight: 'bold',
  display: 'flex',
});

const SunInfo = styled(FormLabel)({
  color: '#5c92ff !important',
  fontSize: 14,
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

const AppIcon = styled(Icon)({
  display: 'flex',
  color: '#ffc077',
});

const AppLabel = styled(FormLabel)({
  color: '#474f72',
  fontSize: 14,
});

const Header: FC = () => {
  const dispatch = useDispatch();

  const [selectedValue, setSelectedValue] = useState<string>('metric');

  const { data: cityWeatherDetails, isFetching, refetch } = useWeather();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedValue(event.target.value);
    dispatch(setUnitValue(event.target.value));
  };

  return (
    <Grid item md container justifyContent={'space-between'}>
      <Grid item md={4} container>
        <Grid item md={12} container justifyContent={'flex-start'}>
          <CurrentHour>{format(new Date(), 'HH:mm a')}</CurrentHour>
        </Grid>
        <Grid item md={12} container justifyContent={'flex-start'}>
          <CurrentDate>{format(new Date(), 'EEEE, dd MMMM, yyyy')}</CurrentDate>
        </Grid>
        <Grid item md={12} container justifyContent={'flex-start'}>
          <CityName>
            <PlaceOutlinedIcon fontSize="large" style={{ display: 'flex' }} />
            {cityWeatherDetails &&
              `${cityWeatherDetails?.city.name} - ${cityWeatherDetails?.city.country}`}
          </CityName>
        </Grid>
      </Grid>
      <Grid item md={2} container>
        <Grid item md={12} container>
          <Grid item md={6} container justifyContent={'flex-start'}>
            <SunInfo>
              <Box display={'flex'}>
                <AppIcon>
                  <WbSunnyIcon fontSize="small" />
                </AppIcon>
                <AppLabel>{'Sunrise'}</AppLabel>
              </Box>
              <Box display={'flex'} ml={3}>
                {cityWeatherDetails &&
                  format(new Date(cityWeatherDetails.city.sunrise), 'HH:mm a')}
              </Box>
            </SunInfo>
          </Grid>
          <Grid item md={6} container justifyContent={'flex-start'}>
            <SunInfo>
              <Box display={'flex'}>
                <AppIcon>
                  <DarkModeIcon fontSize="small" />
                </AppIcon>
                <AppLabel>{'Sunset'}</AppLabel>
              </Box>
              <Box display={'flex'} ml={3}>
                {cityWeatherDetails &&
                  format(new Date(cityWeatherDetails.city.sunset), 'HH:mm a')}
              </Box>
            </SunInfo>
          </Grid>
        </Grid>
        <Grid item md={12} container>
          <Grid item md={6} container justifyContent={'flex-start'}>
            <SunInfo>
              <Box display={'flex'}>
                <AppIcon>
                  <AccessTimeIcon fontSize="small" />
                </AppIcon>
                <AppLabel>{'Timezone'}</AppLabel>
              </Box>
              <Box display={'flex'} ml={3}>
                {cityWeatherDetails &&
                  toHours(cityWeatherDetails.city.timezone)}
              </Box>
            </SunInfo>
          </Grid>
          <Grid item md={6} container justifyContent={'flex-start'}>
            <SunInfo>
              <Box display={'flex'}>
                <AppIcon>
                  <PeopleAltIcon fontSize="small" />
                </AppIcon>
                <AppLabel>{'Population'}</AppLabel>
              </Box>
              <Box display={'flex'} ml={3}>
                {cityWeatherDetails && cityWeatherDetails.city.population}
              </Box>
            </SunInfo>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={4} container justifyContent={'flex-end'}>
        <Grid item md={8} container justifyContent={'flex-end'}>
          <FormControl color="primary">
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
        <Grid item md={12} container justifyContent={'flex-end'}>
          <SearchComponent />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Header;
