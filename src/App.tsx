import React from 'react';
import {
  HashRouter, Redirect, Route, Switch,
}
  from 'react-router-dom';
import 'bulma';
import '@fortawesome/fontawesome-free';
import './App.scss';

import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';
import { NewPerson } from './components/NewPerson';
import { initialList } from './components/PeopleTable';

const App = () => {
  return (
    <HashRouter>
      <div className="App">
        <Header />

        <Switch>
          <Route path="/people/new">
            <div className="form-popup">
              <NewPerson initialList={initialList} />
            </div>
          </Route>

          <Route path="/people">
            <PeoplePage />
          </Route>

          <Route path="/" exact>
            <HomePage />
          </Route>

          <Redirect path="/home" to="/" />

          <NotFoundPage />
        </Switch>
      </div>
    </HashRouter>
  );
};

export default App;
