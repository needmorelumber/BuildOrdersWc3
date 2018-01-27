import React from 'react'
import './buildList.sass'
import BuildSingle from '../BuildSingle/BuildSingle'
import { Link } from 'react-router-dom'
import fetchBuilds from './../../actions/actions'
import LoadingAnimation from './../loadingAnimation';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactPaginate from 'react-paginate';



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
              page = p.builds.page,
              lastUpdated = new Date(b.lastUpdated).toLocaleTimeString(),
              onBuildClick = p.onBuildClick,
              likeBuild = p.likeBuild,
              failedToLoadCheck = b.failedToLoad,
              isFetching = b.isFetching,
              builds = b.visible_items.map((build, index) => {
                return (
                    <article key={index} className="post" onClick={()=>onBuildClick(build._id)}>
                        <h4>{build.name}</h4>
                        <span className="pull-right has-text-grey-light"><i onClick={()=>likeBuild(build._id, page)}className="fa fa-thumbs-up"></i> {build.likes}</span>
                        <div className="media">
                        <div className="media-left">
                            <span className="icon"><i className="fa fa-user"></i></span>
                        </div>
                        <div className="media-content">
                            <div className="content">
                            <p>
                           Posted by {build.ownerUsername}  &nbsp; 
                                <span className="tag">{build.race}</span>
                                <span className="tag">{build.build_type}</span>
                            </p>
                            </div>
                        </div>
                        </div>
                    </article>
              )
              })
        return (
         <div className="section">
            <h1 className="title">All Builds</h1>
            <p className="subtitle">Select to view in detail</p>
            {
                !isFetching
                ?
                    !failedToLoadCheck
                    ? 
                        <div>
                        {builds}
                        </div>
                    :
                    <div>Sorry, something went wrong, builds can not be loaded</div>
                : 
                <LoadingAnimation />
            }
            <hr />
            <br />
         <ReactPaginate previousLabel={"<<"}
                        pageRangeDisplayed={5}
                        nextLabel={">>"}
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