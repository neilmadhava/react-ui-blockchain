import React from 'react';
import {Route, Switch} from "react-router-dom";
import RegistrationForm from './RegistrationForm'; 
import OrgsInterface from './OrgsInterface';
import './App.css';

function App() {
  return (
    <Switch>
      <Route 
        exact 
        path="/" 
        component={RegistrationForm} 
      />
      
      <Route 
        exact 
        path="/orgs/:tokens" 
        component={OrgsInterface} 
      />
      
      <Route 
        exact 
        path="/orgs/:org" 
        render={routeProps => <OrgsInterface {...routeProps} token="" />} 
      />
    </Switch>
  );
}

export default App;
