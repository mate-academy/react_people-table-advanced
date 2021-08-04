import React from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';
import 'bulma/css/bulma.min.css';

import { Header } from './components/Header';
import { PeoplePage } from './components/PeoplePage';
import { HomePage } from './components/HomePage';

import './App.scss';

const App = () => (
  <div className="App">
    <Header />
    <main>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/people" component={PeoplePage} />

        <Redirect to="/" from="/home" />

        <div className="container">
          <h1 className="title is-4">Page Not Found</h1>
        </div>
      </Switch>
    </main>
  </div>
);

export default App;
