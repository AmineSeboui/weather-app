import {
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';
import { SearchComponent, UnitsComponent } from 'components/molecules';
import { useAppSelector, useWeather } from 'hooks';
import { IList } from 'interfaces/IWeatherDetails';
import { FC, useEffect } from 'react';

const Home: FC = () => {
  const { selectedCity, unit } = useAppSelector(({ weather }) => weather);

  const { data: cityWeatherDetails, isLoading, refetch } = useWeather();

  useEffect(() => {
    refetch();
  }, [selectedCity, unit]);

  return (
    <Grid container spacing={2} direction={'column'}>
      {/* Header Component */}
      <Grid item md container justifyContent={'center'}>
        <UnitsComponent />
      </Grid>

      {/* Search Bar Component */}
      <Grid item md container justifyContent={'center'}>
        <SearchComponent />
      </Grid>
      {isLoading ? (
        <CircularProgress color="inherit" size={20} />
      ) : (
        <>
          {/* Displayed City Component */}
          <Grid item md container justifyContent={'center'}>
            <Typography variant="h5" component="div">
              {cityWeatherDetails?.city?.name}
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
        </>
      )}
    </Grid>
  );
};

export default Home;
