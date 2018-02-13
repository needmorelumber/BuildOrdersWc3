import React from 'react'
import './buildList.sass'
import BuildSingle from '../BuildSingle/BuildSingle'
import { Link } from 'react-router-dom'
import fetchBuilds from './../../actions/actions'
import LoadingAnimation from './../loadingAnimation';
import Pagination from './Pagination';
import { CSSTransition, TransitionGroup } from 'react-transition-group';




export default class BuildList extends React.Component {
    constructor(props) {
        super(props)
          this.onChangePage = this.onChangePage.bind(this);
          this.state = {
            pageOfItems: []
          }
    }
    componentDidMount() {
        this.props.fetchBuilds();
    }
    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
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
              builds = this.state.pageOfItems.map((build, index) => {
                return (
                    <CSSTransition
                        key={index}
                        timeout={800}
                        classNames="buildCard"
                    >
                    <article className="post" onClick={()=>onBuildClick(build._id)}>
                        <h4>{build.name}</h4>
                        <span className="pull-right likebuild has-text-grey-light"><i onClick={()=>likeBuild(build._id, page)}className="fa fa-thumbs-up"></i> {build.likes}</span>
                        <div className="media">
                        <div className="media-left" style={{margin:0,padding:0,marginTop:'.5%'}}>
                            <span className="icon"><i className="fa fa-user"></i></span>
                        </div>
                        <div className="media-content">
                            <div className="content">
                            <p>
                                <span className="postedBy">Posted by {build.ownerUsername}</span>
                                <span className="tag">{build.race}</span>
                                <span className="tag">{build.build_type}</span>
                            </p>
                            </div>
                        </div>
                        </div>
                    </article>
                    </CSSTransition>
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
                    <div className="buildsContainer">
                    <Pagination items={b.visible_items} onChangePage={this.onChangePage}/>
                        <TransitionGroup>
                            {builds}
                        </TransitionGroup>
                        
                    </div>
                    :
                    <div>Sorry, something went wrong, builds can not be loaded</div>
                : 
                <LoadingAnimation />
            }
            <hr />
            <br />
        </div>
        )
    }
}