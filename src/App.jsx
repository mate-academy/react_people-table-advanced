import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';
import './App.scss';

export const App = () => (
  <>
    <Header />
    <div className="App">
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/people" component={PeoplePage} />
        <Route path="/notfound" component={NotFoundPage} />
        <Redirect path="/home" to="/" />
        <Redirect path="/" to="/notfound" />
      </Switch>
    </div>
  </>
);
