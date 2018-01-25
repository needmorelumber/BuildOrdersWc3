import React, { Component } from 'react';
import data from './../../MasterData'
import './gamehelper.sass'

class NextOrder extends Component {
  render() {
    const order = this.props.currentOrder;
    if (order) {
      const unit = order.order.race_unit;
      const time = order.order.time;
      const unitData = data[this.props.race][unit] || {...data["N/A"], "Unit":order.order.race_unit};
      return (
          <div className="nextOrderContainer">
            <div className="card nextOrder">
              <div className="card-header">
                <div className="card-header-title title is-1 ">{unitData.Unit}</div>
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
                      <p>Your next order to build.. in {time - this.props.pos} seconds!  </p>
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
          <p className="title is-4"> No order coming up...</p>
        </div>
      )
    }
  }
}

export default NextOrder;