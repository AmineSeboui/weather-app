import {
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { useGeocoding, useWeather } from 'hooks';
import { IList } from 'interfaces/IWeatherDetails';
import { FC, useState } from 'react';

const Home: FC = () => {
  const [selectedValue, setSelectedValue] = useState('Celcius');
  const [selectedCity, setSelectedCity] = useState('tunis');

  const { data: cityGeoDetails, isLoading } = useGeocoding(selectedCity);

  const { data: cityWeatherDetails } = useWeather(
    cityGeoDetails?.[0]?.lat,
    cityGeoDetails?.[0]?.lon
  );

  console.log('cityGeoDetaicityWeatherDetailsls', cityWeatherDetails);

  console.log('cityGeoDetails', cityGeoDetails);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedValue(event.target.value);
  };

  return (
    <Grid container spacing={2} direction={'column'}>
      {/* Header Component */}
      <Grid item md container justifyContent={'center'}>
        <Grid item xs={6} justifyContent={'center'} alignItems={'center'}>
          <FormControl>
            <FormLabel id="demo-form-control-label-placement">Degree</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-form-control-label-placement"
              name="position"
              defaultValue="top"
            >
              <FormControlLabel
                value="Celcius"
                control={
                  <Radio
                    checked={selectedValue === 'Celcius'}
                    onChange={handleChange}
                  />
                }
                label="Celcius"
              />
              <FormControlLabel
                value="Fahrenheit"
                control={
                  <Radio
                    checked={selectedValue === 'Fahrenheit'}
                    onChange={handleChange}
                  />
                }
                label="Fahrenheit"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>

      {/* Search Bar Component */}
      <Grid item md container justifyContent={'center'}>
        <TextField
          id="search"
          label="Search by City ..."
          variant="outlined"
          placeholder="Search by City"
          fullWidth
          size="small"
        />
      </Grid>
      {/* Displayed City Component */}
      <Grid item md container justifyContent={'center'}>
        <Typography variant="h5" component="div">
          {cityGeoDetails?.[0]?.state}
        </Typography>
      </Grid>
      {/* Cards Component */}
      <Grid item md container justifyContent={'center'}>
        {cityWeatherDetails?.list?.map((item: IList, index: number) => (
          <Card sx={{ minWidth: 275 }} variant={'outlined'} key={index}>
            <CardContent>
              <Typography variant="h5" component="div">
                {item?.main?.temp}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {item?.dt_txt}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Grid>
      {/* Charts Component */}
      <Grid item md container justifyContent={'center'}>
        <div>Charts Component</div>
      </Grid>
    </Grid>
  );
};

export default Home;
