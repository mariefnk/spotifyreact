import React, {Component} from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import countries from './data/countries.json';
import getNewReleases from './data/APIcalls.js';
import Gallery from './Gallery.jsx';

class NewReleases extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'FR',
      newReleases: []
    };
  }

handleChange = (event, index, value) => {
  this.setState({value});
  const newReleases = getNewReleases(value);
    console.log("this.state.newReleases", this.state.newReleases);
  this.setState({newReleases});
}

  // handleChange(event, index, value){
  //   console.log("what is value", value);
  //   this.setState({value});
  //   getNewReleases();
  // }

  render() {
    return (
      <div style={{marginLeft:'40%', marginTop:'20px'}}>
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
        <Gallery
          className="gallery"
          tracks={this.state.newReleases}
          />
      </div>
    );
  }
}

export default NewReleases;
