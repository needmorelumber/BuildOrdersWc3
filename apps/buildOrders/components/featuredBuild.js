import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/Star';
import { getFeatImage } from '../constants';

const styles = theme => ({
  card: {
    backgroundImage: `url(${getFeatImage('NE')})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right',
    borderRadius: 'none',
    boxShadow: 'none',
  },
  avatar: {
    backgroundColor: 'gold',
  },
  featuredText: {
    paddingBottom: '8px',
    backgroundColor: 'rgba(0,0,0, 0.3)',
  },
});

class FeaturedBuild extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={(
            <Avatar aria-label="Recipe" className={classes.avatar}>
              <StarIcon />
            </Avatar>
          )}
          title="Archer Rush"
          subheader="NE vs. HU"
        />
        <CardContent className={classes.featuredText}>
          <Typography component="p">
            A very impressive Night Elf featured build from a very important user
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

FeaturedBuild.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FeaturedBuild);
