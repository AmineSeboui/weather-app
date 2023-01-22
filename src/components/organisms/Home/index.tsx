import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';
import { CardsFeed, SearchComponent, Header } from 'components/molecules';
import { useAppSelector, useWeather } from 'hooks';
import { IList } from 'interfaces/IWeatherDetails';
import { FC, useEffect } from 'react';

const Home: FC = () => {
  const { selectedCity, unit } = useAppSelector(({ weather }) => weather);

  const { data: cityWeatherDetails, isFetching, refetch } = useWeather();

  useEffect(() => {
    refetch();
  }, [selectedCity, unit]);

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
            <div>Charts Component</div>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Home;
