import React from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper,Listing} from 'google-maps-react';


function GoogleMap(props) {

    const style = {
        width: '50%',
        height: '100%'
      }
      
   
    return (

        <div>
            <div className="container">
                <div className="row">
                    <div className="col-5">
                        <h1>Search here</h1>
                    </div>
                    <div className="col-7">
                    <Map google={props.google}
                        style={style}
                        zoom={14}
                        
                        >
                                
                        <Marker onClick={props.onMarkerClick}
                                name={'Current location'} />

                        
                    </Map>
                    </div>
                </div>
            </div>
            
            
        </div>
    )
}

//export default GoogleMap

export default GoogleApiWrapper({
    apiKey: ('AIzaSyByS95npy_pgdVbKmfrl7LkGz8epDZwiKk')
 
  })(GoogleMap)