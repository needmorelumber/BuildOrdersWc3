import { connect } from 'react-redux';

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({

});

const BuildDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BuildSingle);

export default TimeLineContainer;
