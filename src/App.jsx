import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import MaterialIcon, {colorPallet} from 'material-icons-react';
import {BrowserRouter, Route, Switch, NavLink} from 'react-router-dom';
import './App.css';
import {FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import Artist from './Artist.jsx';
import Gallery from './Gallery.jsx';
import CardComponent from './CardComponent.jsx';


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
    var accessToken = 'BQD3DuJASMYuHXw04haLGKa5zTd_BpMzQ0Swv74c64OB7VarVzAGWPL9xYKtQLGgWs-530grApAt9DevPScVDLkJbXgVWvRxBD2PrcY9ElCL0yoBvZ9KFCIuhikvHNb061Z7U4B5AhOeKpWZQGbLVcv4KH2tk4L-CylV&refresh_token=AQCsfxDJDnJB3lX-Zdrl6MINlNNP7l9FxxxNHmFwN2a-rCZKHqDFmftmewgmu-qB-IdfJ95jivLrpwCz9g3LOJlpaNL_-EeRiCbtnXRNywO16E-ufMoJrCDlYwi0n11ihDM';
    var params = {
      "url": FETCH_URL,
      "async": true,
      "crossDomain": true,
      "method": "GET",
      "headers": {
        "accept": "application/json",
        "authorization": "Bearer BQD3DuJASMYuHXw04haLGKa5zTd_BpMzQ0Swv74c64OB7VarVzAGWPL9xYKtQLGgWs-530grApAt9DevPScVDLkJbXgVWvRxBD2PrcY9ElCL0yoBvZ9KFCIuhikvHNb061Z7U4B5AhOeKpWZQGbLVcv4KH2tk4L-CylV&refresh_token=AQCsfxDJDnJB3lX-Zdrl6MINlNNP7l9FxxxNHmFwN2a-rCZKHqDFmftmewgmu-qB-IdfJ95jivLrpwCz9g3LOJlpaNL_-EeRiCbtnXRNywO16E-ufMoJrCDlYwi0n11ihDM",
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
  const style = {
    position: 'absolute',
    top:0,
    left:0,
    height: '100vh',
    width: 300,
    textAlign: 'center',
    display: 'inline-block',
    backgroundColor: 'black',
    color: '#7bb92f',
  };
  return(
  <div className="App">
   <CardComponent
     className="left-nav-menu"
     style={style}
     >
   <TextField
     className="nav-menu"
     hintText="Search"
     inputStyle={{color:"white"}}
     floatingLabelText="Search"
     value={this.state.query}
     onChange={event => {this.setState({query: event.target.value})}}
     onKeyPress={event => {if(event.key === 'Enter') {this.search()}}}
   />
  <MaterialIcon icon="search" color='#7bb92f'/>
  <div className="nav-menu">
    <NavLink to="/newreleases" activeClassName="is-active" exact={true}>
      NEW RELEASES
    </NavLink>
  </div>
  <div className="nav-menu">
    <NavLink to="/categories" activeClassName="is-active">
      CATEGORIES
    </NavLink>
  </div>
  </CardComponent>
  { this.state.artist != null?
    ( <div>
          <Artist
           artist={this.state.artist}
          />
         <Gallery
           className="gallery"
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
