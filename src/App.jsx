import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { MainNavigation } from './components/MainNavigation';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';

import 'bulma';
import './App.scss';

const App = () => (
  <>
    <header>
      <MainNavigation />
    </header>

    <section className="section">
      <div className="container">
        <Switch>
          <Route path="/people">
            <PeoplePage />
          </Route>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Redirect path="/home" to="/" exact />

          <NotFoundPage />
        </Switch>
      </div>
    </section>
  </>
);

export default App;
