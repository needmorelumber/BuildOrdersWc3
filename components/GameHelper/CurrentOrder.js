import React, { Component } from 'react';
import data from './../../MasterData';
import './gamehelper.sass'

class CurrentOrder extends Component {
  render() {
    const order = this.props.currentOrder;
    if (order.order) {
      const unit = order.order.race_unit;
      const unitData = data[this.props.race][unit] || {...data["N/A"], "Unit":order.order.race_unit};
      return (
        <div className="currentOrderContainer">
         <p className="">Build this now!</p>
          <div className="card currentOrder">
          <div className="card-header">
            <div className="card-header-title">
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
        </div>
      );
    } else {
      return (
        <div className="section">
          <p className=""> Nothing to build right now...</p>
        </div>
      )
    }
  }
}

export default CurrentOrder;