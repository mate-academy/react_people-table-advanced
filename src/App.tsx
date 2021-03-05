import React, { FC } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Navbar } from './Navbar';
import { PeoplePage } from './PeoplePage';
import { HomePage } from './HomePage';
import { NotFoundPage } from './NotFoundPage';
import './App.scss';  

const App: FC = () => (
  <>
    <header>
      <Navbar />
    </header>
    <div className="App">
      <Switch>
        <Route path='/people/:slug?' component={PeoplePage} />
        <Route exact path='/' component={HomePage} />
        <Redirect path='/home' to='/' />
        <NotFoundPage />
      </Switch>
    </div>
  </>
);

export default App;
