import React, { Component } from 'react';
import data from './../../MasterData';

class CurrentOrder extends Component {
  render() {
    const order = this.props.currentOrder;
    if (order) {
      const unit = order.order.race_unit;
      const unitData = data[this.props.race][unit];
      return (
        <div className="section column">
          <div className="card">
          <div className="card-header">
            <div className="card-header-title">{unitData.Unit}</div>
            <div className="card-header-icon">
                    <figure className="image is-100x100">
                      <img src={unitData.Portrait} alt={unitData.Unit} />
                    </figure>
            </div>
          </div>
            <div className="card-content">
              <div className="media">
                <div className="media-left">
                  <div className="media-content">
                    <p className="title is-1"> Build {this.props.currentOrder.order.count} of these</p>
                  </div>
                  <div className="content">
                    <p>Most Recent Order (Build this if you havent) </p>
                    {unitData && (
                      <ul>
                        <label className="label" htmlFor="Gold">Gold Cost</label>
                        <li>{unitData.Gold}</li>
                        <label className="label" htmlFor="Lumber">Lumber Cost</label>
                        <li>{unitData.Lumber}</li>
                        <label className="label" htmlFor="Supply">Supply Cost</label>
                        <li>{unitData.Supply}</li>
                        <label className="label" htmlFor="HP">Health</label>
                        <li>{unitData["Hit Points"]}</li>
                      </ul>
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
          <p className="title is-4"> Nothing to build right now...</p>
        </div>
      )
    }
  }
}

export default CurrentOrder;