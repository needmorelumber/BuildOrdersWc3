import React, {Component} from 'react';
import Timeline from './../Timeline/Timeline'
import path from 'path';
import {Redirect, Link} from 'react-router-dom';
import LoadingPlaceholder from './../loadingAnimation';
import CurrentOrder from '../EditBuild/CurrentOrder';
import {StickyContainer, Sticky} from 'react-sticky';
// import './buildSingle.sass';

class BuildSingle extends Component {

		componentWillMount() {
				this
						.props
						.fetchById(this.getIdFromPathname());
		}
		getIdFromPathname() {
				return (this.props.match.params.id);
		}
		render() {
				const build = this.props.currentVisibleBuild.item.build,
						state = this.props.currentVisibleBuild,
						user = this.props.userState.user,
						updateOrder = this.props.updateCurrentOrder,
						order = this.props.currentVisibleBuild.currentOrder;
				if (build) {
						const race = this.props.currentVisibleBuild.item.build.race;
						const iconString = path.join('/assets/icons/', race + '.jpg')
						return (
								<div className="section">
										<div className="columns">
												<Timeline
														className="column"
														build={this.props.currentVisibleBuild.item.build}
														updateBuild={this.props.updateBuild}
														toggleEmpty={this.props.toggleEmpty}
														updateOrder={updateOrder}
														fetchById={this.props.fetchById}/>
												<StickyContainer className="column">
														<Sticky >
																{({
																		style,
																		isSticky,
																		wasSticky,
																		distanceFromTop,
																		distanceFromBottom,
																		calculatedHeight,
																		topOffset
																}) => {
																		return (
																				<div className="sideMenu" style={style}>
																						<section className="hero">
																								<div className="hero-body level">
																										<div className="level-left">
																												<figure className="image is-128x128 level-item">
																														<img src={iconString}/>
																												</figure>
																												<div className="rows">
																														<h1 className="title row">
																																{this.props.currentVisibleBuild.item.build.name}
																														</h1>
																														<p className="row subtitle">
																																{race}
																														</p>
																												</div>
																										</div>
																										<div className="level-item">
																												<Link to={this.props.match.url + '/playing'}>
																														<button className="button is-block is-dark is-large">Real Time walkthrough</button>
																												</Link>
																										</div>
																										{user.user
																												? user.user._id === this.props.currentVisibleBuild.item.build.ownerId
																														? <div className="level-item">
																																		<Link to={this.props.match.url + '/edit'}>
																																				<button className="button is-block is-dark is-large">
																																						Edit</button>
																																		</Link>
																																</div>
																														: null
																												: null
}
																								</div>
																						</section>
																						{order
																								? <CurrentOrder data={order}/>
																								: <CurrentOrder data={false}/>
}
																				</div>
																		)
																}
}
														</Sticky>
												</StickyContainer>
										</div>
								</div>
						)
				} else {
						switch (state.isFetching) {
								case true:
								default:
										return (<LoadingPlaceholder/>)
								case false:
										return (
												<div>Could Not find build, sorry!</div>
										)
						}
				}
		}
}

export default BuildSingle;