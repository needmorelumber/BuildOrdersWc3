import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Typography,
  CssBaseline,
} from '@material-ui/core';

import { decorateComponent } from '../../../common/helpers';

import { createBuild } from '../../ducks/build';
import CreateBuildForm from '../forms/buildForm';
import { buildMatchup } from '../../helpers';
import { getCurrentPatch } from '../../constants';

const mapDispatchToProps = {
  createBuildOrder: createBuild,
};


const BuildCreate = ({ createBuildOrder, history }) => {
  const onSubmit = values => createBuildOrder(
    {
      matchup: buildMatchup(values.race, values.opposing_race),
      ownerId: 1,
      ownerUsername: 'fakeUser',
      ...values,
    },
  ).then(createdBuild => history.replace(`/builds/${createdBuild._id}/`));

  const initialValues = {
    patch: getCurrentPatch(),
  };

  return (
    <div style={{ padding: 16, margin: 'auto', maxWidth: 900 }}>
      <CssBaseline />
      <Typography variant="h5" align="center" component="h2" gutterBottom>
        Create Build
      </Typography>
      <CreateBuildForm
        onSubmit={onSubmit}
        validate={() => ({})}
        initialValues={initialValues}
      />
    </div>
  );
};

BuildCreate.propTypes = {
  createBuildOrder: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const decorators = [
  connect(null, mapDispatchToProps),
];

export default decorateComponent(BuildCreate, decorators);
