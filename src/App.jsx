import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.scss';
import 'bulma';

import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { People } from './components/People';

const App = () => (
  <div className="App">
    {/* <h1 className="title">People table</h1> */}

    <Header />

    <Switch>
      <Route path="/people" component={People} />
      <Route path="/" exact component={HomePage} />
      <Redirect path="/home" to="/" />
      <h2 className="subtitle">Not Found Page</h2>
    </Switch>
  </div>
);

export default App;
