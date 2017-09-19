import React, {Component} from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import countries from './data/countries.json';
import accessToken from './data/APIcalls.js';
import Gallery from './Gallery.jsx';
import GalleryManager from "./GalleryManager.jsx";

const BASE_URL_NEW_RELEASES = 'https://api.spotify.com/v1/browse/new-releases';

class NewReleases extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'FR',
      pagesViewed : 0,
      allPages :[],
      next : null,
      currentPageInView : 0,
      totalResult: 0,
    };
  }

  componentDidMount(){
    this.getNewReleases('');
  }

  handleChange = (event, index, value) => {
    this.setState({value, next : null, pagesViewed : 0, currentPageInView: 0});
    this.getNewReleases(value);
  }

  getNewReleases(countrySelected) {

    var FETCH_URL_NEW_RELEASES;
    if(countrySelected ==='' || countrySelected === 'undefined'){
      FETCH_URL_NEW_RELEASES  = BASE_URL_NEW_RELEASES;
    } else {
      FETCH_URL_NEW_RELEASES = `${BASE_URL_NEW_RELEASES}?country=${countrySelected}`;
    }
    var params = {
      "url": FETCH_URL_NEW_RELEASES,
      "async": true,
      "crossDomain": true,
      "method": "GET",
      "headers": {
        "accept": "application/json",
        "authorization": `Bearer ${accessToken}`,
                }
      }

      fetch(FETCH_URL_NEW_RELEASES, params).then(response => response.json()).then(json => {
        const newReleases = json;
        //const GET_AUDIO_FOR_TRACK = `https://api.spotify.com/v1/audio-features/${id}`
        this.setState({ allPages:[newReleases],
                        pagesViewed : 1,
                        currentPageInView:1,
                        next : newReleases.albums.next,
                        totalResult: newReleases.albums.total
                      });
      });
  }


  goToPrev = () => {
    if(this.state.currentPageInView > 1){
      this.setState({
        currentPageInView : this.state.currentPageInView - 1
      })
    }
  }

  goToNext = () => {
    if(this.state.currentPageInView < this.state.pagesViewed){
      // we already have the data
      return  this.setState({
        currentPageInView : this.state.currentPageInView + 1
      })
    }

    var params = {
      "url": this.state.next,
      "async": true,
      "crossDomain": true,
      "method": "GET",
      "headers": {
        "accept": "application/json",
        "authorization": `Bearer ${accessToken}`,
                }
      }
    // we do not have data
    fetch(this.state.next, params).then(response => response.json()).then(json => {
      const newReleases = json;
      this.setState({ allPages:[
                                ...this.state.allPages,
                                newReleases
                                ],
                      pagesViewed : this.state.pagesViewed + 1,
                      currentPageInView:this.state.pagesViewed + 1,
                      next : newReleases.albums.next
                    });
    });
  }

  render() {
    return (

      <div style={{marginTop:'20px'}}>
        <DropDownMenu value={this.state.value} onChange={this.handleChange}>
            {Object.entries(countries).map(([abr, country]) => {
                return(
              <MenuItem key={abr}
                        value={abr}
                        primaryText={country} />
                    )}
                  )
           }
        </DropDownMenu>
        { this.state.currentPageInView <= this.state.pagesViewed?
          <div>

          {this.state.pagesViewed > 0  ?
            <GalleryManager
               className="gallery newreleases-gallery"
               totalResult={this.state.totalResult}
               resultPerPage={10}
               type={"newReleases"}
               goPrev={this.goToPrev}
               goNext={this.goToNext}
               tracks={this.state.allPages[this.state.currentPageInView - 1]}
               isLoading={this.state.isLoading}
              />
            : null }
      </div>
      : null }
      </div>
    );
  }
}



export default NewReleases;
