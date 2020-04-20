import React, { Component } from 'react'
import {Route, Switch} from "react-router-dom";
import RegistrationForm from './RegistrationForm'; 
// import OrgsInterface from './OrgsInterface';
import OrgsUI from './OrgsUI';
import './static/App.css';

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
          // component={OrgsInterface}
          render={routeProps => <RegistrationForm {...routeProps} tokens={this.state.tokens} addTokens={this.addTokens} />}
        />
        
        <Route 
          exact 
          path="/orgs" 
          component={OrgsUI}
        />
        
        <Route 
          exact 
          path="/orgs/:org" 
          render={routeProps => 
            <OrgsUI 
            {...routeProps} 
          />} 
        />
      </Switch>
    );
  }
}

export default App;
