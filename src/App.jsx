import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import { Navigation } from './components/Navigation'
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import './App.scss'
import 'bulma';

const App = () => (
  <div className="App">
    <Navigation />
    <Switch>
      <Route path="/people" component={PeoplePage}/>
      <Route path="/" exact component={HomePage}/>
      <Redirect path="/home" to="/"/>
      <p>Page not found</p>

    </Switch>
  </div>
);

export default App;
