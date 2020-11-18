import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.scss';
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import PeoplePage from './components/PeoplePage/PeoplePage';

const App: React.FC = () => (
  <div className="App">
    <h1>People table</h1>

    <Header />
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/people/:person?" component={PeoplePage} />
      <Redirect path="/home" to="/" />
      <Redirect path="/react_people-table-basics" to="/" />
      <NotFoundPage />
    </Switch>
  </div>
);

export default App;
