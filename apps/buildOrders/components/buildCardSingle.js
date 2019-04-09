import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { decorateComponent } from '../../common/helpers';
import { getIconString } from '../constants';

const styles = () => ({
  card: {
    height: '100%',
  },
  avatar: {
    objectFit: 'cover',
    backgroundColor: 'black',
  },
});

const BuildCardSingle = ({ classes, build }) => {
  const { name, description, race, matchup, _id } = build;
  const iconString = getIconString(race);

  return (
    <Card className={classes.card}>
      <CardHeader
        to={`builds/${_id}`}
        component={Link}
        avatar={(
          <Avatar aria-label={race} className={classes.avatar}>
            <img alt="" src={iconString} />
          </Avatar>
          )}
        title={name}
        subheader={`${matchup}`}
      />
      {/* <CardMedia
        className={classes.media}
        image="/static/images/cards/paella.jpg"
        title="Paella dish"
      /> */}
      <CardContent>
        <Typography component="p">
          { description }
        </Typography>
      </CardContent>
      {/* Soon we use these actions for sharing link and favoriting build */}
      {/* <CardActions className={classes.actions} disableActionSpacing>
        <IconButton aria-label="Add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="Share">
          <ShareIcon />
        </IconButton>
      </CardActions> */}
    </Card>
  );
};

BuildCardSingle.propTypes = {
  build: PropTypes.object,
  classes: PropTypes.object.isRequired,
};

const decorators = [
  withStyles(styles),
];

export default decorateComponent(BuildCardSingle, decorators);
