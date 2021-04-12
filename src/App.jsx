import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.scss';
import 'semantic-ui-css/semantic.min.css';

import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';
import { MainNavigation } from './components/MainNavigation';

const App = () => (
  <div className="App">
    <MainNavigation />
    <Switch>

      <Route path="/people">
        <PeoplePage />
      </Route>

      <Route path="/" exact>
        <HomePage />
      </Route>

      <Redirect path="/home" to="/" />

      <NotFoundPage />

    </Switch>
  </div>
);

export default App;
