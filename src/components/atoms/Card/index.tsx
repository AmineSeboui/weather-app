import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { IList } from 'interfaces/IWeatherDetails';
import { FC } from 'react';
import { makeStyles } from '@mui/styles';
import { format, isToday, isTomorrow } from 'date-fns';
import { useAppSelector } from 'hooks';
import AirIcon from '@mui/icons-material/Air';
import VisibilityIcon from '@mui/icons-material/Visibility';
import OpacityIcon from '@mui/icons-material/Opacity';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import _ from 'lodash';
import { nanoid } from 'nanoid';
import { _renderDateLabel } from 'utils';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#ffffff30',
    borderRadius: '16px',
    margin: '0 1rem 1rem 0',
    minWidth: '32.5%',
    cursor: 'pointer',
    height: '100%',
  },
  smallCardRoot: {
    backgroundColor: '#ffffff30',
    border: '1px solid lightgrey',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.01)',
    borderRadius: '25px',
  },
  card: {
    height: '100px',
    width: '100px',
    margin: 'auto',
  },
  smallCardImage: {
    height: '50px',
    width: '50px',
    margin: 'auto',
  },
  smallCardInfo: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: '12px',
  },
  info: {
    fontWeight: 'bold',
    color: 'white',
  },
}));

type Props = {
  item: IList[];
};

const WeatherCard: FC<Props> = ({ item }: Props) => {
  const classes = useStyles();

  const { unit } = useAppSelector(({ weather }) => weather);

  const hourlyWeatherCard = (item: IList) => (
    <Grid item md={3} key={nanoid()}>
      <Card variant={'outlined'} className={classes.smallCardRoot}>
        <CardMedia
          component="img"
          className={classes.smallCardImage}
          image={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
          alt={`${item.weather[0].description}`}
        />
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            className={classes.smallCardInfo}
          >
            {format(new Date(item.dt_txt), 'HH aaa')}
          </Typography>
          <Typography
            sx={{ mb: 1.5 }}
            variant="h6"
            className={classes.smallCardInfo}
          >
            {`${(item.main.temp ?? 0).toFixed(2)}° ${
              unit === 'metric' ? 'C' : 'F'
            }`}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
  return (
    <Card variant={'outlined'} className={classes.root}>
      <CardContent>
        <Grid container>
          <Grid item md={4}>
            <CardMedia
              component="img"
              className={classes.card}
              image={`http://openweathermap.org/img/wn/${
                item[item.length > 4 ? 3 : 0].weather[0].icon
              }@2x.png`}
              alt={`${item[item.length > 4 ? 3 : 0].weather[0].description}`}
            />
            <Typography variant="h5" component="div" className={classes.info}>
              {_renderDateLabel(item[0].date)}
            </Typography>
            <Typography variant="h6" className={classes.info}>
              {`${(item[item.length > 4 ? 3 : 0].main.temp ?? 0).toFixed(2)}°${
                unit === 'metric' ? 'C' : 'F'
              }`}
            </Typography>
            <Typography
              variant="body2"
              component={'strong'}
              className={classes.info}
              fontSize={12}
              sx={{ mb: 1.5 }}
            >
              {`L ${(item[0].main.temp_min ?? 0).toFixed(2)}°${
                unit === 'metric' ? 'C' : 'F'
              } - H ${(item[0].main.temp_max ?? 0).toFixed(2)}°${
                unit === 'metric' ? 'C' : 'F'
              }`}
            </Typography>
          </Grid>
          <Grid item md={8} container>
            <Grid item md={12}>
              <Box display={'flex'} p={2} gap={1} style={{ color: 'white' }}>
                <CloudQueueIcon fontSize="small" />
                <Typography variant="body2" component="span">
                  {'Weather'}
                </Typography>
                <Divider
                  orientation="vertical"
                  style={{
                    width: '2px',
                    height: '20px',
                    backgroundColor: 'white',
                  }}
                />
                <Typography variant="body2" component="span" noWrap>
                  {`${_.capitalize(item[0].weather[0].description)}`}
                </Typography>
              </Box>
            </Grid>
            <Grid item md={12}>
              <Box display={'flex'} p={2} gap={1} style={{ color: 'white' }}>
                <AirIcon fontSize="small" />
                <Typography variant="body2" component="span">
                  {'Wind'}
                </Typography>
                <Divider
                  orientation="vertical"
                  style={{
                    width: '2px',
                    height: '20px',
                    backgroundColor: 'white',
                  }}
                />
                <Typography variant="body2" component="span">
                  {`${Math.round(item[0].wind.speed ?? 0)} ${
                    unit === 'metric' ? 'meter/sec' : 'miles/hour'
                  }, ${Math.round(item[0].wind.deg ?? 0)}°`}
                </Typography>
              </Box>
            </Grid>
            <Grid item md={12}>
              <Box display={'flex'} p={2} gap={1} style={{ color: 'white' }}>
                <OpacityIcon fontSize="small" />
                <Typography variant="body2" component="span">
                  {'Humidity'}
                </Typography>
                <Divider
                  orientation="vertical"
                  style={{
                    width: '2px',
                    height: '20px',
                    backgroundColor: 'white',
                  }}
                />
                <Typography variant="body2" component="span">
                  {`${item[0].main.humidity ?? 0} %`}
                </Typography>
              </Box>
            </Grid>
            <Grid item md={12}>
              <Box display={'flex'} p={2} gap={1} style={{ color: 'white' }}>
                <VisibilityIcon fontSize="small" />
                <Typography variant="body2" component="span">
                  {'Visibility'}
                </Typography>
                <Divider
                  orientation="vertical"
                  style={{
                    width: '2px',
                    height: '20px',
                    backgroundColor: 'white',
                  }}
                />
                <Typography variant="body2" component="span">
                  {`${(item[0].visibility / 1000 ?? 0).toFixed(1)} km`}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          {item.map((item) => hourlyWeatherCard(item))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
