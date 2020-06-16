import React, { Component} from 'react';
import GoogleMapReact from 'google-map-react';
import Markers from './Markers'
import Origami from './Origami'

export class MapContainer extends Component {

	state = {
		showingInfoWindow: false,
		activeMarker: {},
	};

	static defaultProps = {
		center: {
		  lat: 29.76,
		  lng: -95.36
		},
		zoom: 13
	};

	createMarkers = () => {
		const markers = [];	
		
		this.props.studios.forEach((studio, index) => {
			const lat = studio.coordinates.lat;
			const lng = studio.coordinates.lng;
			const name = studio.name;
			const address = studio.address;
			markers.push(
				<Markers key={index} lat={lat} lng={lng} name={name} address={address}></Markers>
			)
		});
		return markers
	}

	render() {

		if (this.props.studios.length > 0) {
			return (
				<div style={{ height: 'calc(100vh - 57px', width: '100%' }}>
					<GoogleMapReact
					bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
					defaultCenter={this.props.center}
					defaultZoom={this.props.zoom}
					distanceToMouse={()=>{}}
					>
					{this.createMarkers()}
					</GoogleMapReact>
      			</div>
			);
		} else {
			return <Origami />
		}	
	}	
}

export default MapContainer;