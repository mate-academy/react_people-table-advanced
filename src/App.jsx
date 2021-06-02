import React from 'react';
import 'bulma';

import { Switch, Route, Redirect } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage';

const App = () => (
  <div className="container">
    <Header />

    <div className="section">
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>

        <Route path="/people">
          <PeoplePage />
        </Route>

        <Redirect path="/home" to="/" />

        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </div>
  </div>
);

export default App;
