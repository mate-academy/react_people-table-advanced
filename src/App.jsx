import React from 'react';
import { Link, NavLink, Redirect, Route, Switch } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';
import './App.scss';

import logo from './images/svg-2.svg';

export const App = () => (
  <div className="App">
    <header className="header header--theme_light header--size_l">
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
      <nav className="nav">
        <div className="nav__list">
          <NavLink
            to="/"
            exact
            className="nav__item"
            activeClassName="is-active"
          >
            Home
          </NavLink>
          <NavLink
            to="/people"
            className="nav__item"
            activeClassName="is-active"
          >
            People
          </NavLink>
        </div>
      </nav>
    </header>
    <section>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/people/:id?" exact component={PeoplePage} />
        <Redirect path="/home" to="/" />
        <NotFoundPage />
      </Switch>
    </section>
  </div>
);
