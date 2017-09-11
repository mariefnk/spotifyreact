import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import MaterialIcon, {colorPallet} from 'material-icons-react';
import './App.css';
import {FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import Artist from './Artist.jsx';
import Gallery from './Gallery.jsx';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      query: "",
      artist: null,
      tracks: [],
    }
  }


    search() {
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    //ES6 version of BASE_URL + 'q=' + this.state.query + '&type=artist&limit=1';
    let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    const ARTIST_TOP_TRACKS_URL= 'https://api.spotify.com/v1/artists/';
    var accessToken = 'BQB_0Ywq6n6UnPHu0roHaCQM2ijPt-IBKhsIfTQjTEWkEcKwC9tDd_O4anE3hbALDO1x6gccwOuHC6P1MaQTpcZ171KPeVQhXt4Udu3EIXvcMM1h3SY5iMU2QJjbwyjlukoDSHEczDimJgNpeG_KOf4m_U6PolZHbT4z&refresh_token=AQDDTx2TTW-qPhVkkwf5R_plpWtiGKQFw3eI_3ko1wjVOzuuqlN-4AS9FT0NorUVAZw3atJuHvix6hHulX3h1rST_YrIVdjcD65wxJ85umiY7nkDzSjxXyrden-voHTq5ZI';
    var params = {
      "url": FETCH_URL,
      "async": true,
      "crossDomain": true,
      "method": "GET",
      "headers": {
        "accept": "application/json",
        "authorization": "Bearer BQB_0Ywq6n6UnPHu0roHaCQM2ijPt-IBKhsIfTQjTEWkEcKwC9tDd_O4anE3hbALDO1x6gccwOuHC6P1MaQTpcZ171KPeVQhXt4Udu3EIXvcMM1h3SY5iMU2QJjbwyjlukoDSHEczDimJgNpeG_KOf4m_U6PolZHbT4z&refresh_token=AQDDTx2TTW-qPhVkkwf5R_plpWtiGKQFw3eI_3ko1wjVOzuuqlN-4AS9FT0NorUVAZw3atJuHvix6hHulX3h1rST_YrIVdjcD65wxJ85umiY7nkDzSjxXyrden-voHTq5ZI",
                }
              }
 // the fetch method in javascript returns a promise. A promise is code returs by a function that represents data that might have availablity now, later or never at all. //then() is a callback that takes an anoynmous arrow function. Need to return response.json() to have the payload of information returned by the API call.
    fetch(FETCH_URL, params).then(response => response.json()).then(json => {
      const artist = json.artists.items[0];
      console.log("artist", json);
      // ES6 shorthand for this.setState({artist:artist});
      this.setState({artist});

    FETCH_URL = `${ARTIST_TOP_TRACKS_URL}${this.state.artist.id}/top-tracks?country=US`;
    fetch( FETCH_URL, params).then(response => response.json()).then(json => {
        console.log("songs", json);
        // ES6 format for const tracks = json.tracks;
        const {tracks} = json;
        this.setState({tracks});
      });

  });
  }

render(){
  console.log("this.state.tracks", this.state.tracks);
  return(
  <div className="App">
   <TextField
     hintText="Search"
     inputStyle={{color:"white"}}
     floatingLabelText="Search"
     value={this.state.query}
     onChange={event => {this.setState({query: event.target.value})}}
     onKeyPress={event => {if(event.key === 'Enter') {this.search()}}}
   />
  <MaterialIcon icon="search" color='#7bb92f'/>
  { this.state.artist != null?
    ( <div>
          <Artist
           artist={this.state.artist}
          />
         <Gallery
           tracks ={this.state.tracks}
           />
      </div>
  ) : null
  }

</div>
  )
}
}

export default App;
