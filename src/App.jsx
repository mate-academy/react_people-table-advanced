import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { Header } from './components/Header';

import './App.scss';
import { NotFoundPage } from './components/NotFoundPage';

const App = () => (
  <>
    <Router>
      <Header />

      <div className="App">
        <Switch>
          <Route
            path="/"
            exact
            component={HomePage}
          />
          <Route
            path="/people/:personSlug?"
            component={PeoplePage}
          />

          <Redirect
            path="/home"
            to="/"
          />

          <NotFoundPage />
        </Switch>
      </div>
    </Router>
  </>
);

export default App;
