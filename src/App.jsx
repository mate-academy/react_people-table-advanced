import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import NotFoundPage from './components/NotFoundPage';
import './App.scss';

const App = () => (
  <div className="App">
    <Header />

    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/people" component={PeoplePage} />

      <Redirect path="/home" to="/" />

      <NotFoundPage />
    </Switch>
  </div>
);

export default App;
