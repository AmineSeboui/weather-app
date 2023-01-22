import { Grid } from '@mui/material';
import { WeatherCard } from 'components/atoms';
import { ICityWeatherDetails, IList } from 'interfaces/IWeatherDetails';
import { FC, useCallback, useRef } from 'react';
import { nanoid } from 'nanoid';
import { makeStyles } from '@mui/styles';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

const useStyles = makeStyles(() => ({
  content: {
    overflowX: 'scroll',
    overflowY: 'hidden',
    scrollBehavior: 'smooth',
    minWidth: '100%',
    paddingTop: '1.5rem',
    position: 'relative',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  leftArrow: {
    position: 'absolute',
    display: 'flex',
    borderRadius: '50%',
    opacity: 1,
    left: 0,
    top: '60%',
    cursor: 'pointer',
  },
  rightArrow: {
    position: 'absolute',
    display: 'flex',
    borderRadius: '50%',
    opacity: 1,
    right: 0,
    top: '60%',
    cursor: 'pointer',
  },
}));

type Props = {
  cityWeatherDetails: ICityWeatherDetails | undefined;
};

const CardsFeed: FC<Props> = ({ cityWeatherDetails }: Props) => {
  const classes = useStyles();

  const carouselRef = useRef<HTMLDivElement | null>(null);

  const handleNavigate = (direction: 'right' | 'left') => {
    carouselRef.current
      ? direction === 'right'
        ? (carouselRef.current.scrollLeft += 435)
        : (carouselRef.current.scrollLeft -= 435)
      : null;
  };

  return (
    <Grid container spacing={2} direction={'column'}>
      <ArrowBackIosNewRoundedIcon
        fontSize="large"
        className={classes.leftArrow}
        onClick={() => handleNavigate('left')}
      />

      <ArrowForwardIosRoundedIcon
        fontSize="large"
        className={classes.rightArrow}
        onClick={() => handleNavigate('right')}
      />
      <Grid
        item
        container
        justifyContent="flex-start"
        alignItems="center"
        wrap="nowrap"
        className={classes.content}
        ref={carouselRef}
      >
        {cityWeatherDetails?.groupedList?.map((item: IList[]) => (
          <WeatherCard item={item} key={nanoid()} />
        ))}
      </Grid>
    </Grid>
  );
};

export default CardsFeed;
