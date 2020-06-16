import React, { Component } from 'react';
import ArtCard from './ArtCard'
import Origami from './Origami'

class Artist extends Component {
    
    render() {
        const artists = this.props.artists;
        if (artists.length !== 9){
            return <Origami />;
        } else
            return (
                <div className="cards">
                    {
                        artists.map((artist, index) =>
                            <ArtCard
                                key={index}
                                name={artist.name} 
                                location={artist.studio}
                                address={artist.address}
                                url={artist.url}
                            />  
                        )
                    }
                </div>       
            )
    }    
}

export default Artist;