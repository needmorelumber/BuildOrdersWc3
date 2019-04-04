import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { decorateComponent } from '../../../common/helpers';
import { getBuildOrderCall } from '../../ducks/build';

const mapStateToProps = ({ buildOrder }) => ({
  buildOrder,
});

const mapDispatchToProps = {
  getBuildOrder: getBuildOrderCall,
};

class BuildDetail extends React.Component {
  componentDidMount() {
    this.props.getBuildOrder(this.getId());
  }

  getId() {
    return this.props.match.params.id;
  }

  render() {
    const { buildOrder } = this.props;
    return (
      <div>
        <span>name: {buildOrder.name}</span> <br />
        <span>race: {buildOrder.race}</span> <br />
        <span>opposing_race: {buildOrder.opposing_race}</span> <br />
        <span>matchup: {buildOrder.matchup}</span> <br />
        <span>description: {buildOrder.description}</span> <br />
        <span>patch: {buildOrder.patch}</span> <br />
        <span>ownerUsername: {buildOrder.ownerUsername}</span> <br />
        <span>ownerId: {buildOrder.ownerId}</span> <br />
        <span>buildSteps: <pre>{JSON.stringify(buildOrder.buildSteps)}</pre></span> <br />
      </div>
    );
  }
}

const decorators = [
  connect(mapStateToProps, mapDispatchToProps),
];

BuildDetail.propTypes = {
  match: PropTypes.object.isRequired,
  getBuildOrder: PropTypes.func.isRequired,
  buildOrder: PropTypes.object,
};

export default decorateComponent(BuildDetail, decorators);
