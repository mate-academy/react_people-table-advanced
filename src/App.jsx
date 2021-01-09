import React from 'react';
import './App.scss';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Header } from './Header';
import { PeopleTable } from './PeopleTable';

const App = () => (
  <div className="App">
    <Header />
    <Switch>
      <Route path="/" exact>
        <h2>Home page</h2>
      </Route>
      <Route path="/people">
        <PeopleTable />
      </Route>
      <Redirect to="/" />
    </Switch>
  </div>
);

export default App;
