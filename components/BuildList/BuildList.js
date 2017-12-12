import React from 'react'
import './buildList.sass'
import BuildSingle from '../BuildSingle/BuildSingle'
import { Link } from 'react-router-dom'
import fetchBuilds from './../../actions/actions'



export default class BuildList extends React.Component {
    constructor(props) {
        super(props)
    }
    
    componentWillMount() {
        this.props.fetchBuilds()
    }
    
    render() {
        const builds = this.props.builds.items,
              lastUpdated = new Date(this.props.builds.lastUpdated).toLocaleTimeString();
        const onBuildClick = this.props.onBuildClick;
        return (
        
         <div className="section">
            <h1 className="title">Warcraft 3 RoC build orders</h1>
            <p className="subtitle">Select to view in detail</p>
                <div className="columns">
                    <div className="column is-8">
                    <table className="table is-fullwidth is-hoverable">
                        <thead>
                            <tr>
                                <th> Race </th>
                                <th> Name </th>
                                <th> Style </th>
                                <th> Public Stats </th>
                            </tr>
                        </thead>
                        <tbody>
                        { builds.map((build, index) => (
                            // 2nd 'arg' Takes the build of current iteration and copies the object to props
                            <tr key={index} onClick={()=>onBuildClick(build._id)}>
                                <td>{build.race}</td>
                                <td>{build.name}</td>
                                <td>{build.build_type}</td>
                                <td>"liked/viewed x times"</td>
                            </tr>
                        ))
                        }
                        </tbody>
                    </table>
                    </div>
                    <div className="column">
                    <Link to="/new"> <button type="" className="button"> Submit a new build</button> </Link>
                    </div>
                </div>
        </div>
        )
    }
}