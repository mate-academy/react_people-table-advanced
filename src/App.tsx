import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.scss';
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import PeoplePage from './components/PeoplePage/PeoplePage';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/people/:person?" component={PeoplePage} />
        <Redirect path="/home" to="/" />
        <Redirect path="/people" to="/" />
        <PageNotFound />
      </Switch>
    </div>
  );
};

export default App;
