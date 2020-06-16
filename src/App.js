import React, { Component } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Intro from './components/Intro'
import Artist from './components/Artist'
import MapContainer from './components/MapContainer'
import db from './config';

class App extends Component {

	state = {
		artists: [],
		studios: []
	}
	
	componentDidMount() {
		//Get data from Firebase
		const artistDB = db.ref('artist');
		const studioDB = db.ref('studio');
		const artistArr = [];
		const studioArr = [];

		//Get studio data from Firebase
		studioDB.once("value", (snapshot) => {
			snapshot.forEach((childSnapshot) => {
				let studioName = childSnapshot.key;
				let studioAddress = childSnapshot.val().address;
				//Place studios into array
				studioArr.push({
					name: studioName,
					address: studioAddress
				})
			});
		}).then( () => {
			//Get artist data from Firebase
			artistDB.once("value", (snapshot) => {			
				snapshot.forEach((childSnapshot) => {
					let artistName = childSnapshot.key;
					let artistURL = childSnapshot.val().url;
					let artistStudio = childSnapshot.val().studio;
					
					let artistObj = {				
						name: artistName,
						url: artistURL,
						studio: artistStudio,
						//Set correct studio address to studio name
						address: studioArr.find( (studio) => studio.name === artistStudio).address 			
					}
					//Push this object onto artist array
					artistArr.push(artistObj)
					//Add artistObj to state
					this.setState({
						artists: artistArr 
					})
				});
			})
		}).then( () => {
			const studio_locations = [];
			const studio_coordinates = [];

			//Get studio addresses and format for query
			studioArr.forEach(studio => {
				const comma = studio.address.indexOf(",");
				const address_substring = studio.address.slice(0, comma);
				const formatted_address = address_substring.replace(/ /g, "+");

				studio_locations.push({
					address: studio.address,
					query_address: formatted_address,
					name: studio.name					
				});
			})

			//Send request to Google Geocodes with formatted addresses and add to studio_coordinates array
			studio_locations.forEach(studio => {
				fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${studio.query_address},+Houston,+TX&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`)
				.then(res => res.json())
				.then(resp => studio_coordinates.push({
					coordinates: resp.results[0].geometry.location,
					name: studio.name,
					address: studio.address
				}))
				console.log(studio_coordinates)
			})	
			this.setState({
				studios: studio_coordinates
			})
		})
	}

	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<Navbar bg="warning" variant="light">
						<Navbar.Brand><Link to="/">Houston Art Crawl</Link></Navbar.Brand>
						<Nav className="ml-auto">
							<Link to="/artist">Artist</Link>
							<Link to="/map">Map</Link>
						</Nav>
					</Navbar>
					<div className="main">
						<Switch>
							<Route exact path="/">
								<Intro/>
							</Route>
							<Route path="/artist">
								<Artist artists={this.state.artists}/>
							</Route>
							<Route path="/map">
								<MapContainer studios={this.state.studios}/>
							</Route>
						</Switch>
					</div>
				</div>
			</BrowserRouter>
		)
	}
}


export default App;