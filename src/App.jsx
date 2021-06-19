import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Header } from './components/Header';
import { PeoplePage } from './pages/PeoplePage';
import { HomePage } from './pages/HomePage';
import 'bulma';
import './App.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => (
  <div className="App">
    <Header />
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column">
            <Switch>
              <Route path="/" exact>
                <HomePage />
              </Route>
              <Route path="/people">
                <PeoplePage />
              </Route>
              <Redirect path="/home" to="/" />
              <p>Not found Page</p>
            </Switch>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default App;
