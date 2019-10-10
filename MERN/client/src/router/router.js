import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//import Home from '../containers/home';
import Posts from '../containers/posts';
import Profile from '../containers/profile';

import Login from '../containers/login';
import MainPage from '../containers/mainpage';
import PostDetail from '../containers/postdetail';

import NavMenu from '../components/navigation/nav';
import Notification from '../containers/fcm';

export default class Routing extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<div className="container-full">
					<NavMenu islogin={this.props.islogin} />
				</div>
				<div className="container">
					<Route path="/" exact component={MainPage} />
					<Route path="/main" component={MainPage} />
					<Route path="/login" exact component={Login} />
					<Route path="/fcm" exact component={Notification} />
					<Route path="/posts" component={Posts} />
					<Route path="/profile" exact component={Profile} />
					<Route path="/profile/:id" component={Profile} />
					<Route path="/post/:id" component={PostDetail} />
				</div>

				<div className="container-full">
					<footer
						className="section footer-classic context-dark bg-image"
						style={{ background: '#2d3246', marginTop: '20px' }}
					>
						<div className="container">
							<div className="col-md-6">
								<div className="pr-xl-4">
									<a className="brand" href="index.html">
										<img
											className="brand-logo-light"
											src="images/agency/logo-inverse-140x37.png"
											alt=""
											width="140"
											height="37"
											srcset="images/agency/logo-retina-inverse-280x74.png 2x"
										/>
									</a>
									<p>
										Made on MERN Stack with love.
									</p>
									<p className="rights">
										<span>©  </span>
										<span className="copyright-year">2019</span>
										<span> </span>
										<span>. </span>
										<span>All Rights Reserved.</span>
									</p>
								</div>
							</div>
							
							 
						</div>
					</footer>
				</div>
			</div>
		);
	}
}
