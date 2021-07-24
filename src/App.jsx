import React from 'react';

import './App.scss';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';

const App = () => (
  <div className="App">
    <header className="header">
      <ul>
        <li><Link to="/">Home page</Link></li>
        <li><Link to="/people">PeoplePage</Link></li>
      </ul>
    </header>
    <Switch>
      <Route path="/" exact>
        <HomePage />
      </Route>
      <Route path="/people" exact>
        <PeoplePage />
      </Route>
      <Redirect path="home" to="/" />
      <NotFoundPage />
    </Switch>
  </div>
);

export default App;
