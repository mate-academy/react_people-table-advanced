import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { Header } from './components/Header/Header';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { PageNotFound } from './components/PageNotFound/PageNotFound';

import './App.scss';

const App: React.FC = () => (
  <div className="App">
    <Header />

    <Switch>

      <Route exact path="/home">
        <HomePage />
      </Route>

      <Route
        exact
        path="/people/:personSlug?"
        render={({ match }: MatchProps) => (
          <PeoplePage personSlug={match.params.personSlug} />)}
      />

      <Redirect exact from="/" to="/home" />

      <PageNotFound />
    </Switch>
  </div>
);

export default App;
