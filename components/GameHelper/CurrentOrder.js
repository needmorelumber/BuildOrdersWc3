import React, { Component } from 'react';
import data from './../../MasterData';
import path from 'path'

class CurrentOrder extends Component {
  render() {
    const unitData = data[this.props.race][this.props.currentOrder.race_unit];
    return (
      <div className="card">
        <div className="card-content">
          <div className="media">
            <div className="media-left">
            { unitData && (
              <figure className="image is-48x48">
                <img src={unitData.Portrait} alt={unitData.Unit} />
              </figure>
              )
            }
            <div className="media-content">
              <p className="title is-2">{unitData.Unit}</p>
              <p className="subtitle is-4"> Build {this.props.currentOrder.count} of these</p>
            </div>
            <div className="content">
              <p>Most Recent Order (Build this if you havent) </p>
              { unitData && (
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
    );
  }
}

export default CurrentOrder;