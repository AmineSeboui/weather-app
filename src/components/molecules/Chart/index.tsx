import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { FC } from 'react';
import { makeStyles } from '@mui/styles';
import { ICityWeatherDetails, IList } from 'interfaces/IWeatherDetails';
import { nanoid } from 'nanoid';
import { _renderDateLabel } from 'utils';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#ffffff30',
    borderRadius: '16px',
    margin: '0 1rem 1rem 0',
    width: '100%',
    cursor: 'pointer',
    height: '100%',
  },
  info: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: '16px',
  },
}));

type Props = {
  cityWeatherDetails: ICityWeatherDetails | undefined;
};

const ChartCard: FC<Props> = ({ cityWeatherDetails }: Props) => {
  const classes = useStyles();

  const calcPrecipitaion = (item: IList[]) => {
    return item?.reduce((prev, curr) => prev + curr.pop, 0);
  };
  return (
    <Card variant={'outlined'} className={classes.root}>
      <CardContent>
        <Box sx={{ p: 1, mb: 2 }} textAlign="start">
          <Typography variant="h5" component="div" className={classes.info}>
            {'Probability of precipitation'}
          </Typography>
        </Box>
        <Grid container>
          {cityWeatherDetails?.groupedList?.map((item) => (
            <Grid item md key={nanoid()} container spacing={1}>
              <Grid
                item
                md={12}
                container
                justifyContent={'center'}
                alignItems={'flex-start'}
              >
                <Typography
                  variant="h5"
                  component="div"
                  className={classes.info}
                >
                  {`${(calcPrecipitaion(item) * 10).toFixed(1)}%`}
                </Typography>
              </Grid>
              <Grid
                item
                md={12}
                container
                justifyContent={'center'}
                alignItems={'flex-end'}
                style={{ height: '6rem' }}
              >
                <Divider
                  orientation="vertical"
                  style={{
                    width: '20%',
                    height: `${calcPrecipitaion(item) * 20}px`,
                    backgroundColor: 'white',
                  }}
                />
              </Grid>
              <Grid
                item
                md={12}
                container
                justifyContent={'center'}
                alignItems={'flex-start'}
              >
                <Typography
                  variant="h5"
                  component="div"
                  className={classes.info}
                >
                  {_renderDateLabel(item[0].date)}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ChartCard;
