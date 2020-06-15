import React, { Component } from 'react';
import mapMarker from './marker.png'
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

class Markers extends Component {
    
    render() {
        const infoWindow =             
            <Popover id="popover-basic">
                <Popover.Title as="h3">{this.props.name}</Popover.Title>
                <Popover.Content>{this.props.address}</Popover.Content>
            </Popover>
        
        return (
            <OverlayTrigger trigger="click" placement="top" overlay={infoWindow}>
                <img src={mapMarker} alt="Map Marker" className="marker" />      
            </OverlayTrigger>
        )
    }
}

export default Markers;