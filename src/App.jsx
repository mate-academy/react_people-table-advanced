import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { PeopleTable } from './components/PeopleTable';
import { PageNotFound } from './components/PageNotFound';

import './App.scss';

const App = () => (
  <div className="app">

    <header>
      <Navigation />
    </header>

    <main className="app__main">
      <div className="app__content">
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/people/:slug?">
            <PeopleTable />
          </Route>

          <Redirect path="/home" to="/" />

          <PageNotFound />
        </Switch>
      </div>
    </main>
  </div>
);

export default App;
