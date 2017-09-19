import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './App.css';
import TextField from 'material-ui/TextField';
import MaterialIcon from 'material-icons-react';
import CardComponent from './CardComponent.jsx';


class App extends Component {

  search = ( ) =>{
    console.log("here", this.props);
    console.log(this.searchInput);
  }

  render(){
    const style = {
      position: 'absolute',
      top:0,
      left:0,
      height: '200%',
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
      <div className="nav-menu">
        <NavLink to="/search" activeClassName="is-active">
          <div>
          <TextField
            className="nav-menu"
            hintText="Search"
            inputStyle={{color:"white"}}
            floatingLabelText="Search"
            ref={node => this.searchInput = node}
            onKeyPress={event => {if(event.key === 'Enter') {this.search()}}}
          />
           <MaterialIcon icon="search" color='#7bb92f'/>
        </div>
        </NavLink>
      </div>
      <div className="nav-menu">
      <NavLink to="/newreleases" activeClassName="is-active">
        NEW RELEASES
      </NavLink>
    </div>
    <div className="nav-menu">
      <NavLink to="/categories" activeClassName="is-active">
        CATEGORIES
      </NavLink>
    </div>
    </CardComponent>
    {this.props.children}
  </div>
    )
  }

}


export default App;
