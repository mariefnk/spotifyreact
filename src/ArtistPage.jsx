import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Artist from "./Artist.jsx";
import accessToken from './data/APIcalls.js';
import Gallery from "./Gallery.jsx";

const BASE_URL = 'https://api.spotify.com/v1/search?';
const ARTIST_TOP_TRACKS_URL= 'https://api.spotify.com/v1/artists/';

class ArtistPage extends Component {
  state = {
    isLoading : false,
    artist : null
  }
  componentDidMount(){
    //fetch articlst
    this.setState({
      isLoading : true,
      artist : null,
    });
    //ES6 version of BASE_URL + 'q=' + this.state.query + '&type=artist&limit=1';
    var FETCH_URL = `${BASE_URL}q=${this.props.match.params.artistName}&type=artist&limit=1`;
    var params = {
      "url": FETCH_URL,
      "async": true,
      "crossDomain": true,
      "method": "GET",
      "headers": {
        "accept": "application/json",
        "authorization": `Bearer ${accessToken}`,
                }
              }
  // the fetch method in javascript returns a promise. A promise is code returs by a function that represents data that might have availablity now, later or never at all. //then() is a callback that takes an anoynmous arrow function. Need to return response.json() to have the payload of information returned by the API call.
    fetch(FETCH_URL, params).then(response => response.json()).then(json => {
      const artist = json.artists.items[0];
      console.log("artist", artist);
      this.setState({
        isLoading :false,
        artist,
      });
    });
  }

  render() {
    const {isLoading , artist} = this.state;
    if(isLoading || !artist){
      return null;
    }
    return (
      <div>
        <Artist artist={artist} />
        <ArtistGallery artist={artist}/>
      </div>
    );
  }
}

class ArtistGallery extends Component{
  static propTypes = {
    artist : PropTypes.object.isRequired
  }
  state = {
    isLoading : false,
    tracks : []
  }
  componentDidMount(){
    this.setState({
      isLoading : true,
    //  tracks : []
    });
    const {artist} =  this.props;
     var FETCH_URL_TRACKS = `${ARTIST_TOP_TRACKS_URL}${artist.id}/top-tracks?country=US`;
           console.log(" FETCH_URL_TRACKS ",   FETCH_URL_TRACKS);
     var params = {
       "url": FETCH_URL_TRACKS,
       "async": true,
       "crossDomain": true,
       "method": "GET",
       "headers": {
         "accept": "application/json",
         "authorization": `Bearer ${accessToken}`,
                 }
               }
      fetch(FETCH_URL_TRACKS, params).then(response => response.json()).then(json => {
          // ES6 format for const tracks = json.tracks;
          const {tracks} = json;
          console.log("songs", tracks);
          this.setState({
            isLoading :false,
            tracks
          });

      });
  }

  render(){
    if(this.state.isLoading){
      return null;
    }
    return <Gallery
       type={"artist"}
       tracks={this.state.tracks}
       isLoading={this.state.isLoading}
      />;
  }
}

export default ArtistPage;
