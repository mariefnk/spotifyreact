import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import MainApp from './App.jsx';
import NewReleases from './NewReleases.jsx';
import Categories from './Categories.jsx';
import CardComponent from './CardComponent.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();


const style = {
  height: 100,
  width: 1100,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
  backgroundColor: 'black',
  color: '#7bb92f',
};

 const pageNotFound = () => (
   <CardComponent
     title="Page not found"
     style={style}
     />
 );


const routes = (
  <MuiThemeProvider>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={MainApp} exact={true}/>
        <Route path="/newreleases" component={NewReleases}/>
        <Route path="/categories" component={Categories}/>
        <Route component={pageNotFound}/>
      </Switch>
    </BrowserRouter>
  </MuiThemeProvider>
);

ReactDOM.render(routes , document.getElementById('root')
);
