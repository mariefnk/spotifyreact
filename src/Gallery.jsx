import React, {Component} from 'react';
import './App.css';

class Gallery extends Component {

    constructor(props){
      super(props);
      this.state = {
        playingUrl: '',
        playing: false,
        audioPlaying: null,
      }

    }
     playTrack(previewUrl){
      let audioPlaying = new Audio(previewUrl);
      if(!this.state.playing){
        audioPlaying.play();
        this.setState({
          playing: true,
          playingUrl: previewUrl,
          audioPlaying
        })
      } else {
        if(this.state.playingUrl === previewUrl){
          this.state.audioPlaying.pause();
          this.setState({
            playing: false
          })
        } else {
          this.state.audioPlaying.pause();
          audioPlaying.play();
          this.setState({
            playing: true,
            playingUrl: previewUrl,
            audioPlaying
          })
        }
      }
    }
    render(){
    console.log("tracks", this.props);
    const {tracks} = this.props;
    return (
      <div>
        {tracks.map((track, index) => {
          const trackImg = track.album.images[0].url;
          // new scope so we return again
          return(
            <div key ={index}
                 className="track"
                 onClick={() => this.playTrack(track.preview_url)}
              >
              <img src={trackImg}
                   className ="track-img"
                   alt="track"
                />
              <div className="track-play">
                <div className="track-play-inner">
                  {
                    this.state.playingUrl === track.preview_url?
                    <span>| | </span> : <span>&#9654;</span>
                  }
                </div>
              </div>
              <p className="track-text">
                {track.name}
              </p>
            </div>
          )
        })
      }
      </div>
    )
  }
}

export default Gallery;
