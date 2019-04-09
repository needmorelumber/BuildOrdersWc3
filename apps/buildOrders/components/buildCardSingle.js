import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { decorateComponent } from '../../common/helpers';

const styles = theme => ({
  card: {
    height: '100%',
  },
  avatar: {
    objectFit: 'cover',
    backgroundColor: 'black',
  },
});

const getIconString = race => {
  const map = {
    HU: 'Human',
    OR: 'Orc',
    UD: 'Undead',
    NE: 'Night Elf',
  };
  return `https://s3.us-west-2.amazonaws.com/needmorelumberassets/icons/${map[race]}.jpg`;
};

class BuildCardSingle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { classes, build } = this.props;
    const { name, description, race, opposing_race, _id } = build;
    const iconString = getIconString(race);

    return (
      <Card className={classes.card}>
        <CardHeader
          to={`builds/${_id}`}
          component={Link}
          avatar={(
            <Avatar aria-label={race} className={classes.avatar}>
              <img src={iconString} />
            </Avatar>
            )}
          title={name}
          subheader={`${race} vs. ${opposing_race}`}
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
  }
}

BuildCardSingle.propTypes = {
  iconString: PropTypes.string,
  build: PropTypes.object,
  classes: PropTypes.object.isRequired,
};

const decorators = [
  withStyles(styles),
];

export default decorateComponent(BuildCardSingle, decorators);
