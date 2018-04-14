import React, { Component } from 'react';
import '../EditBuild/editbuild.sass';
import data from './../../MasterData';
import {updateCurrentOrder} from './../../actions/build'


class CurrentOrder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.data !== undefined){
      this.setState({data: nextProps.data.order});
    }
  }
  
  render() {
    let unitData, unit;
    if(this.state.data){
      unit = this.state.data.race_unit;
      unitData = data[this.props.race][unit] || {...data["N/A"], "Unit":this.state.data.race_unit};
    }
    return (
      <div>
        <div className="panel currentOrder">
        { unitData 
          ?
          <div className="card">
          <div className="card-header">
            <div className="card-header-title title is-1">
            {unitData.Unit}</div>
            <div className="card-header-icon">
                    <figure className="image is-64x64">
                      <img className="unitImage" src={unitData.Portrait} alt={unitData.Unit} />
                    </figure>
            </div>
          </div>
            <div className="card-content">
              <div className="media">
                <div className="media-left">
                  <div className="media-content">
                    <p className="title is-4"> Build {this.state.data.count || 1} of these</p>
                  </div>
                  <div className="content">
                    {unitData && (
                      <div>
                        <label className="label" htmlFor="Gold">Gold Cost</label>
                        <p>{unitData.Gold}</p>
                        <label className="label" htmlFor="Lumber">Lumber Cost</label>
                        <p>{unitData.Lumber}</p>
                        <label className="label" htmlFor="Supply">Supply Cost</label>
                        <p>{unitData.Supply}</p>
                        <label className="label" htmlFor="Build Time">Build Time</label>
                        <p>{unitData["Build Time"]} Seconds</p>
                    </div>
                     )
                    }
                  </div>
                </div>
              </div>
            </div>

          </div>
          :
          null
        }
        </div>
      </div>
    );

  }
}

const mapStateToProps = (state) => {
  return {
    data: state.currentVisibleBuild.currentOrder
  }
}


export default CurrentOrder;