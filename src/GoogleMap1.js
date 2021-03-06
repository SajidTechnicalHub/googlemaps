
import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';

export class GoogleMap1 extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          address: '',
          showingInfoWindow: false,
          activeMarker: {},
          selectedPlace: {},

          mapCenter:{
            lat: 30.3753,
            lng: 69.3451
          }
        }
      };
      style = {
        width: '50%',
        height: '100%'
      }
   
    handleChange = address => {
        this.setState({ address });
      };
    
      handleSelect = address => {
        geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
          .then(latLng => {
            console.log('Success', latLng)
            this.setState({address});  // update the  searched address in search box.
            this.setState({ mapCenter: latLng }); // select searched sity, country from the search box.
          })
          .catch(error => console.error('Error', error));
      };
      
    render() {
      return (
          <div>
              <div className="container">
                <div className="row">
                    <div className="col-5">
                        <h1>Search here</h1>
                        <PlacesAutocomplete
                            value={this.state.address}
                            onChange={this.handleChange}
                            onSelect={this.handleSelect} >
                          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                          <div>
                            <input
                            {...getInputProps({
                                placeholder: 'Search Places ...',
                                className: 'location-search-input',
                            })}
                            />
                            <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                                const className = suggestion.active
                                ? 'suggestion-item--active'
                                : 'suggestion-item';
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                <div
                                    {...getSuggestionItemProps(suggestion, {
                                    className,
                                    style,
                                    })}
                                >
                                    <span>{suggestion.description}</span>
                                </div>
                                );
                            })}
                            </div>
                        </div>
                        )}
                    </PlacesAutocomplete>
                    </div>
                    <div className="col-7">
                      <Map google={this.props.google}
                        style={this.style}
                        zoom={12}
                        initialCenter={{
                        lat: this.state.mapCenter.lat,
                        lng: this.state.mapCenter.lng
                       }}>
                      <Marker onClick={this.onMarkerClick}
                          position={{
                            lat: this.state.mapCenter.lat,
                            lng: this.state.mapCenter.lng
                          }}
                          />
          
                     </Map>
                    </div>
                </div>
            </div>
            
          </div>

        
      )
    }
  }

  export default GoogleApiWrapper({
   apikey: ('AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg')
  })(GoogleMap1)