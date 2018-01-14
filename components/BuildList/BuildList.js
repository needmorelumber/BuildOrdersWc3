import React from 'react'
import './buildList.sass'
import BuildSingle from '../BuildSingle/BuildSingle'
import { Link } from 'react-router-dom'
import fetchBuilds from './../../actions/actions'
import LoadingAnimation from './../loadingAnimation';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactPaginate from 'react-paginate';
import FilterPanel from './FilterPanel';



export default class BuildList extends React.Component {
    constructor(props) {
        super(props)
          this.handlePageClick = this.handlePageClick.bind(this);
    }
    componentDidMount() {
        const page = this.props.builds.page;
        this.props.fetchBuilds(page);
    }
    nextPage(page){
        this.props.fetchBuilds(page + 1);
    }
    handlePageClick(data)  {
        this.nextPage(data.selected)
    }
    render() {
        const p = this.props,
              b = p.builds,
              lastUpdated = new Date(b.lastUpdated).toLocaleTimeString(),
              onBuildClick = p.onBuildClick,
              failedToLoadCheck = b.failedToLoad,
              isFetching = b.isFetching,
              builds = b.items.map((build, index) => (
                                // 2nd 'arg' Takes the build of current iteration and copies the object to props
                                <tr key={index} onClick={()=>onBuildClick(build._id)}>
                                    <td>{build.race}</td>
                                    <td>{build.name}</td>
                                    <td>{build.build_type}</td>
                                    <td>{build.ownerUsername}</td>
                                    <td>"liked/viewed x times"</td>
                                </tr>
                            ))
        return (
         <div className="section">
            <h1 className="title">Warcraft 3 RoC build orders</h1>
            <p className="subtitle">Select to view in detail</p>
            <FilterPanel />
            {
                !isFetching
                ?
                    !failedToLoadCheck
                    ?  
                        <table className="table is-fullwidth is-hoverable allBuilds">
                            <thead>
                                <tr>
                                    <th> Race </th>
                                    <th> Name </th>
                                    <th> Style </th>
                                    <th> Author </th>
                                    <th> Public Stats </th>
                                </tr>
                            </thead>
                            <tbody>
                                {builds}
                            </tbody>
                        </table>
                    :
                    <div>Sorry, something went wrong, builds can not be loaded</div>
                : 
                <LoadingAnimation />
            }
         <ReactPaginate previousLabel={"previous"}
                        pageRangeDisplayed={5}
                        nextLabel={"next"}
                        breakLabel={<a href="">...</a>}
                        pageCount={this.props.builds.totalBuilds / 10}
                        marginPagesDisplayed={2}
                        pageClassName={"page"}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages"}
                        activeClassName={"active"} />
        </div>
        )
    }
}