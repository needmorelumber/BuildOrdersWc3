import React from 'react';
import { connect } from 'react-redux';
import { decorateComponent } from '../../../common/helpers';
import { createBuild } from '../../ducks/build';

const mapDispatchToProps = {
  createBuildOrder: createBuild,
};

const BuildCreate = () => (
  <div />
);

const decorators = [
  connect(null, mapDispatchToProps),
];

export default decorateComponent(BuildCreate, decorators);
