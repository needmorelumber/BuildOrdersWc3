import React from 'react';
import './buildList.sass';
import { Link } from 'react-router-dom';
import path from 'path';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import InfiniteScroll from 'react-infinite-scroll-component';
import BuildSingle from '../BuildSingle/BuildSingle';
import CurrentBuild from '../../containers/CurrentBuild';
import LoadingAnimation from '../loadingAnimation/loadingAnimation';
import Pagination from './Pagination';
import data from '../../MasterData';

export default class BuildList extends React.Component {
  constructor(props) {
    super(props);
    this.onChangePage = this.onChangePage.bind(this);
    this.state = {
      pageOfItems: [],
      expandedItem: false,
    };
  }

  componentDidMount() {
    this.props.fetchBuilds();
  }

  onChangePage(pageOfItems) {
    this.setState({ pageOfItems,
      expandedItem: false });
  }

  handleExpandItem(index) {
    if (index === false) {
      this.setState({
        expandedItem: false,
      });
    } else if (index === this.state.expandedItem) {
      this.setState({
        expandedItem: false,
      });
    } else {
      this.setState({
        expandedItem: index,
      });
    }
  }

  onBuildClick(id, index) {
    this.handleExpandItem(index);
    this.props.onBuildClick(id);
  }

  fetchMoreData() {
    this.setState({
      pageOfItems: this.state.pageOfItems.concat(this.props.builds.visible_items.from({ length: 10 })),
    });
  }

  render() {
    const p = this.props;
    const b = p.builds;
    const { page } = p.builds;
    const lastUpdated = new Date(b.lastUpdated).toLocaleTimeString();
    const { onBuildClick } = p;
    const { likeBuild } = p;
    const failedToLoadCheck = b.failedToLoad;
    const { isFetching } = b;
    const builds = b.visible_items ? b.visible_items.map((build, index) => {
      const { race } = build;
      const iconString = `https://s3.us-west-2.amazonaws.com/needmorelumberassets/icons/${race}.jpg`;
      return (
        <CSSTransition
          key={index}
          timeout={800}
          classNames="buildCard"
        >
          <article className="post" onClick={() => this.onBuildClick(build._id, index)}>
            { p.userState.user.user !== false
              ? <span className="pull-right likebuild has-text-grey-light"><i onClick={() => likeBuild(build._id, page, index)} className="fa fa-thumbs-up" /> {build.likes}</span>
              : null
                    }
            <div className="media postmedia">
              <div className="media-left" style={{ margin: 0, padding: 0, marginTop: '.5%' }}>
                <figure className="image is-50x50">
                  <img src={iconString} alt="" />
                </figure>
              </div>
              <div className="media-content">
                <div className="content">
                  <h4>{build.name}</h4>
                  <span className="postedBy">Posted by {build.ownerUsername}</span>
                  <p>
                    <span className="tag">{build.race} vs. {build.opposing_race}</span>
                    <span className="tag">{build.build_type}</span>
                  </p>
                </div>
              </div>
            </div>
            {
                          this.state.expandedItem === index
                            ? <CurrentBuild />
                            : null
                        }

          </article>
        </CSSTransition>
      );
    }) : null;
    return (
      <div className="buildsSection has-text-centered section">
        <h1 className="title">All Warcraft 3 build guides</h1>
        <p className="subtitle">Select to view in detail</p>
        {
                !isFetching
                  ? !failedToLoadCheck
                    ? (
                      <div className="buildsContainer">
                        {/* <Pagination items={b.visible_items} onChangePage={this.onChangePage} />
                        <TransitionGroup>
                          {builds}
                        </TransitionGroup> */}
                        <InfiniteScroll
                          dataLength={b.visible_items.length}
                          next={() => this.fetchMoreData()}
                          hasMore
                          loader={<h4>Loading...</h4>}
                        >
                          { console.log(this.state.pageOfItems) }
                          { this.state.pageOfItems }
                        </InfiniteScroll>

                      </div>
                    )
                    : <div>Sorry, something went wrong, builds can not be loaded</div>
                  : <LoadingAnimation />
            }
        <hr />
        <br />
      </div>
    );
  }
}
