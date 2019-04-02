import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { decorateComponent } from '../../../common/helpers';

import { createBuild } from '../../ducks/build';
import CreateBuildForm from '../forms/create';
import { buildMatchup } from '../../helpers';

const mapDispatchToProps = {
  createBuildOrder: createBuild,
};

const BuildCreate = ({ createBuildOrder }) => (
  <CreateBuildForm
    onSubmit={values => createBuildOrder({ matchup: buildMatchup(values.race, values.opposing_race), ownerId: 1, ownerUsername: 'fakeUser', ...values })}
  />
);

BuildCreate.propTypes = {
  createBuildOrder: PropTypes.func.isRequired,
};

const decorators = [
  connect(null, mapDispatchToProps),
];

export default decorateComponent(BuildCreate, decorators);
