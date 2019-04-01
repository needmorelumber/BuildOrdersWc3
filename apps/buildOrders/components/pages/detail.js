import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { decorateComponent } from '../../../common/helpers';
import { getBuildOrderCall } from '../../ducks';

const mapStateToProps = ({ buildOrder }) => ({
  buildOrder,
});

const mapDispatchToProps = {
  getBuildOrder: getBuildOrderCall,
};

class BuildDetail extends React.Component {
  componentDidMount() {
    this.props.getBuildOrder(this.props.id);
  }

  render() {
    return (
      <div>hello</div>
    );
  }
}

const decorators = [
  connect(mapStateToProps, mapDispatchToProps),
];

BuildDetail.propTypes = {
  getBuildOrder: PropTypes.func.isRequired,
  buildOrder: PropTypes.object,
};

export default decorateComponent(BuildDetail, decorators);
