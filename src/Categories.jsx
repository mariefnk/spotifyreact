import React, {Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import Gallery from './Gallery.jsx';
import accessToken from './data/APIcalls.js';


class Categories extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'pop',
      genreSeeds: [],
      searchText: '',
      selectedCategory: '',
      recommendationsSeeds: []
    };
    this.getGenreSeeds();
  }

  getGenreSeeds() {
    var GENRE_SEEDS = 'https://api.spotify.com/v1/recommendations/available-genre-seeds';
    var params = {
      "url": GENRE_SEEDS,
      "async": true,
      "crossDomain": true,
      "method": "GET",
      "headers": {
        "accept": "application/json",
        "authorization": `Bearer ${accessToken}`,
                }
      }
   fetch(GENRE_SEEDS, params).then(response => response.json()).then(json => {
    const genreSeeds = json.genres;
    this.setState({genreSeeds});
  });
  }

  getRecommendationsBasedOnSeeds(){
    const RECOMMENDATIONS_SEEDS = `https://api.spotify.com/v1/recommendations?seed_genres=${this.state.selectedCategory}`;
    console.log("RECOMMENDATIONS_SEEDS", RECOMMENDATIONS_SEEDS);
    var params = {
      "url": RECOMMENDATIONS_SEEDS,
      "async": true,
      "crossDomain": true,
      "method": "GET",
      "headers": {
        "accept": "application/json",
        "authorization": `Bearer ${accessToken}`,
                }
      }
    fetch(RECOMMENDATIONS_SEEDS, params).then(response => response.json()).then(json => {
     const recommendationsSeeds = json;
     console.log("recommendationsSeeds", recommendationsSeeds);
     this.setState({recommendationsSeeds});
   });
  }

  handleUpdateInput = (searchText) => {
    this.setState({
      searchText,
      selectedCategory: searchText
    });
  };

   handleNewRequest = (chosen, index) => {
     this.setState({
       searchText: '',
       selectedCategory: chosen
     });
     this.getRecommendationsBasedOnSeeds();
   };


  render() {
    return (
      <div style={{marginLeft:'25%', marginTop:'20px'}}>
        <div>
       <AutoComplete
         hintText={this.state.selectedCategory ===''? this.state.genreSeeds[0] : this.state.selectedCategory}
         searchText={this.state.searchText}
         onUpdateInput={this.handleUpdateInput}
         onNewRequest={this.handleNewRequest}
         dataSource={this.state.genreSeeds}
         filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
         openOnFocus={true}
         listStyle={{ maxHeight: 300, overflow: 'auto' }}
       />
     </div>

      </div>
    );
  }
}

export default Categories;
