import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Gallery from './Gallery.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import './App.css';

class GalleryManager extends Component {

  static propTypes = {
   totalResult: PropTypes.number,
   resultPerPage: PropTypes.number,
   previousText: PropTypes.string,
   nextText: PropTypes.string,
   resultText: PropTypes.string,
   type: PropTypes.string.isRequired,
   goPrev: PropTypes.function,
   goNext: PropTypes.function,
   tracks: PropTypes.object.isRequired,
   isLoading : PropTypes.bool.isRequired
 }

   static defaultProps = {
     previousText : "Prev",
     nextText : "Next",
     resultText: "Results",
   }
    constructor(props){
      super(props);
      this.state = {
        searchKey : ""
      }
    }


     render(){
       const {
        totalResult,
        resultPerPage,
        previousText,
        nextText,
        resultText,
        type,
        goPrev,
        goNext,
        tracks,
        isLoading
        } = this.props;
        if(isLoading){
          return null;
        }
       return <div>
         <div>{totalResult} {resultText}</div>
         <Gallery tracks={tracks} type={type}/>
         <div style={{textAlign: "right", marginRight: 105, marginTop: 15}}>
          <RaisedButton onClick={goPrev} label={previousText} style={{marginRight: 15}}/>
          <RaisedButton onClick={goNext} label={nextText} primary={true}/>
          </div>
       </div>
     }
   }


export default GalleryManager;
