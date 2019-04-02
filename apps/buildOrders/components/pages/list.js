import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { decorateComponent } from '../../../common/helpers';
import { getBuildOrdersCall } from '../../ducks/builds';

const mapStateToProps = ({ buildOrders }) => ({
  buildOrders,
});

const mapDispatchToProps = {
  getBuildOrders: getBuildOrdersCall,
};

class BuildList extends React.Component {
  componentDidMount() {
    this.props.getBuildOrders();
  }

  render() {
    const { buildOrders } = this.props;
    return buildOrders.map(buildOrder => (
      <div>
        <span>id: {buildOrder._id}</span> <br />
        <span>name: {buildOrder.name}</span> <br />
        <span>race: {buildOrder.race}</span> <br />
        <span>opposing_race: {buildOrder.opposing_race}</span> <br />
        <span>matchup: {buildOrder.matchup}</span> <br />
        <span>description: {buildOrder.description}</span> <br />
        <span>patch: {buildOrder.patch}</span> <br />
        <span>ownerUsername: {buildOrder.ownerUsername}</span> <br />
        <span>ownerId: {buildOrder.ownerId}</span> <br />
        <span>buildSteps: {buildOrder.buildSteps}</span> <br />
        <br />
        <br />
      </div>
    ));
  }
}

const decorators = [
  connect(mapStateToProps, mapDispatchToProps),
];

BuildList.propTypes = {
  getBuildOrders: PropTypes.func.isRequired,
  buildOrders: PropTypes.array,
};

export default decorateComponent(BuildList, decorators);
