import React, {Component} from 'react';
import PropTypes from "prop-types";
import './App.css';


class Track extends Component{
  static propTypes = {
    playTrackFn : PropTypes.func.isRequired,
    isPlaying : PropTypes.bool.isRequired,
    trackImg : PropTypes.string.isRequired,
    trackName : PropTypes.string.isRequired,
    trackPreviewUrl : PropTypes.string
  }
  render(){
    const {
      playTrackFn,
      isPlaying,
      trackImg,
      trackName,
      trackPreviewUrl
    } = this.props;

    return(
            <div className="track"
                 onClick={playTrackFn}
              >
              <img src={trackImg}
                   className ="track-img"
                   alt="track"
                />
              <div className="track-play">
                <div className="track-play-inner">
                  {
                    isPlaying?
                    <span>| | </span> : <span>&#9654;</span>
                  }
                </div>
              </div>
              <p className="track-text">
                {trackName}
              </p>
            </div>
          )
  }
}

export default Track;
