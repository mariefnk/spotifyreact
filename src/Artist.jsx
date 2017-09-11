import React, {Component} from 'react';
import './App.css';

class Artist extends Component {
  render(){
    console.log("prop", this.props);
    var artist = {name: '', followers: {total: ''}, images: [{url: ''}], genres: []};
    artist = this.props.artist !==null? this.props.artist: artist;

    return (
      <div className="artist">
        <img alt="artist"
             className="artist-img"
             src={artist.images[0].url}
          />
        <div className="artist-info">
        <div className="artist-name">{artist.name}</div>
        <div className="artist-followers">{artist.followers.total != null? artist.followers.total : 0} followers</div>
       <div className="artist-genres">
         {
          artist.genres.map((genre, index) => {
            genre = genre !== artist.genres[artist.genres.length-1]? `${genre} ,`: `& ${genre}`
           return(
             <span key={index}>{genre}</span>
           )
         })
        }
       </div>
    </div>
  </div>
  );
  }
}

export default Artist;
