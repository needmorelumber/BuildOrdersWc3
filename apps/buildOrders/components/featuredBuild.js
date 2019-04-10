import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/Star';

const styles = theme => ({
  card: {
    maxWidth: 500,
    width: '50%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: 'gold',
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
          title="Acolyte Rush"
          subheader="UDvHU"
        />
        <CardContent>
          <Typography component="p">
            A very impressive featured build from a very important user
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
