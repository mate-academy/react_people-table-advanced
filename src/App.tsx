import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { HomePage } from './components/Home';
import { PeoplePage } from './components/PeoplePage';

import './App.scss';
import { MainNavigation } from './components/MainNavigation';
import { NotFoundPage } from './components/NotFoundPage';

const App = () => (
  <div className="App">
    <MainNavigation />

    <h1 className="app__Header">React people table</h1>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/people/:personId?" component={PeoplePage} />

      <Redirect path="/home" to="/" />
      <Route component={NotFoundPage} />
    </Switch>
  </div>
);

export default App;
