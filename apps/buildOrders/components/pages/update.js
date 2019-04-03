import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Typography,
  Link,
  CssBaseline,
} from '@material-ui/core';

import { decorateComponent } from '../../../common/helpers';

import { updateBuild, getBuildOrderCall } from '../../ducks/build';
import UpdateBuildForm from '../forms/buildForm';
import { buildMatchup } from '../../helpers';

const mapStateToProps = ({ buildOrder }) => ({
  buildOrder,
});


const mapDispatchToProps = {
  getBuildOrder: getBuildOrderCall,
  updateBuildOrder: updateBuild,
};


class BuildUpdate extends React.Component {
  componentDidMount() {
    this.props.getBuildOrder(this.getId());
  }

  getId() {
    return this.props.match.params.id;
  }

  render() {
    const onSubmit = values => this.props.updateBuildOrder(
      {
        _id: this.props.buildOrder._id,
        matchup: buildMatchup(values.race, values.opposing_race),
        ownerId: this.props.buildOrder.ownerId,
        ownerUsername: this.props.buildOrder.ownerUsername,
        ...values,
      },
    ).then(() => this.props.history.replace(`/builds/${this.props.buildOrder._id}/`));

    return (
      <div style={{ padding: 16, margin: 'auto', maxWidth: 900 }}>
        <CssBaseline />
        <Typography variant="h5" align="center" component="h2" gutterBottom>
          Edit Your Build
        </Typography>
        <Typography paragraph>
          I stole <Link href="https://codesandbox.io/s/9ywq085k9w">this code.</Link>
        </Typography>
        <UpdateBuildForm
          onSubmit={onSubmit}
          validate={() => ({})}
          initialValues={this.props.buildOrder}
        />
      </div>
    );
  }
}

BuildUpdate.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  updateBuildOrder: PropTypes.func.isRequired,
  buildOrder: PropTypes.object,
  getBuildOrder: PropTypes.func.isRequired,
};

const decorators = [
  connect(mapStateToProps, mapDispatchToProps),
];

export default decorateComponent(BuildUpdate, decorators);
