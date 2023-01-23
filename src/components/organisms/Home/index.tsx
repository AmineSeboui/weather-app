import { Box, CircularProgress, Grid } from '@mui/material';
import { CardsFeed, Header } from 'components/molecules';
import { getWeather, useAppSelector } from 'hooks';
import { FC, useEffect } from 'react';
import { ChartCard } from 'components/molecules';
import { useQuery } from 'react-query';

const Home: FC = () => {
  const { selectedCity, unit } = useAppSelector(({ weather }) => weather);

  const {
    data: cityWeatherDetails,
    isFetching,
    refetch,
  } = useQuery(
    'getWeather',
    () => getWeather(selectedCity.lat, selectedCity.lon, unit),
    { refetchOnWindowFocus: false }
  );

  useEffect(() => {
    refetch();
  }, [selectedCity, unit, refetch]);

  return (
    <Grid container spacing={2} direction={'column'}>
      {/* Header Component */}
      <Grid item md container>
        <Header />
      </Grid>

      {isFetching ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '50vh',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Cards Component */}
          <Grid item md container justifyContent={'center'}>
            <CardsFeed cityWeatherDetails={cityWeatherDetails} />
          </Grid>
          {/* Charts Component */}
          <Grid item md container justifyContent={'center'}>
            <ChartCard cityWeatherDetails={cityWeatherDetails} />
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Home;
