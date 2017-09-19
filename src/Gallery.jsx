import React, {Component} from 'react';
import Track from './Track.jsx';
import FlatButton from 'material-ui/FlatButton';
import './App.css';



class Gallery extends Component {

    constructor(props){
      super(props);
      this.state = {
        playingUrl: '',
        playing: false,
        audioPlaying: null,
        options: null,
      }

      //   Gallery.propTypes = {
      //    name: PropTypes.string.isRequired,
      //    previewUrl: PropTypes.string,
      //    image: PropTypes.string,
      //  }


    }
     playTrack(previewUrl){
       if(!previewUrl){
         return;
       }
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
            playing: false,
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
      console.log("props", this.props);
      var {tracks} = this.props;
      if(this.props.type === "newReleases"){
          tracks = tracks.albums.items;
          return (
            <div className="gallery">
              {tracks.map((track, index) => {
                const trackImg = track.images[0].url;
                // new scope so we return again
                return (
                  <div style={{display: "inline-block"}}>
                  <Track
                    key={index}
                    playTrackFn={() => this.playTrack(track.preview_url)}
                    trackPreviewUrl={ track.preview_url}
                    isPlaying={this.state.playing && this.state.playingUrl === track.preview_url}
                    trackName={track.name}
                    trackImg={trackImg}
                    />
                  <div>
                  <FlatButton label="View Artist" style={{marginLeft: "25%", backgroundColor: '#6AE368', color: 'white', borderRadius: '30px'}} labelStyle={{fontSize: '10px'}}/>
                  </div>
                  </div>
                )
              })
            }
            </div>
          );
      }else{
        return (
          <div className="gallery">
            {tracks.map((track, index) => {
              const trackImg = track.album.images[0].url;
              // new scope so we return again
              return (
                <Track
                  key={index}
                  playTrackFn={() => this.playTrack(track.preview_url)}
                  trackPreviewUrl={ track.preview_url}
                  isPlaying={this.state.playing && this.state.playingUrl === track.preview_url}
                  trackName={track.name}
                  trackImg={trackImg}
                  />
              )
            })
          }
          </div>
        )
      }

  }
}

export default Gallery;
