import React, { Component } from 'react';
import origami from './origami.png'

class Origami extends Component {
    
    render() {
        
        return (
            <img src={origami} alt="Origami Bird Placeholder" id="origami"/>      
        )
    }    
}

export default Origami;