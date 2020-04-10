import React, { Component } from 'react'
import {Route, Switch} from "react-router-dom";
import RegistrationForm from './RegistrationForm'; 
// import OrgsInterface from './OrgsInterface';
import OrgsUI from './OrgsUI';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      tokens: {}
    };
    this.addTokens = this.addTokens.bind(this);
  }

  addTokens(obj){
      this.setState({
          tokens: obj
      });
  }

  render() {
    return (
      <Switch>
        <Route 
          exact 
          path="/"
          render={routeProps => <RegistrationForm {...routeProps} tokens={this.state.tokens} addTokens={this.addTokens} />}
        />
        
        <Route 
          exact 
          path="/orgs/" 
          render={routeProps => <OrgsUI 
            {...routeProps} 
            // tokens={this.state.tokens} 
          />}
        />
        
        <Route 
          exact 
          path="/orgs/:org" 
          render={routeProps => 
            <OrgsUI 
            {...routeProps} 
            // token={`${routeProps.location.state[routeProps.match.params.org]}`} 
          />} 
        />
      </Switch>
    );
  }
}

export default App;
