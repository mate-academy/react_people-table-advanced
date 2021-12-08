import {
  Redirect, Route, Switch,
} from 'react-router-dom';
import 'bulma';

import './App.scss';
import { FC } from 'react';
import {
  HomePage, NotFoundPage, Header, PeoplePage,
} from './components';

const App: FC = () => (
  <div className="App">
    <Header />

    <section className="section">
      <div className="container">
        <h1 className="title">
          Mate Academy
        </h1>

        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/people/:personSlug?">
            <PeoplePage />
          </Route>

          <Redirect to="/" path="/home" />

          <NotFoundPage />
        </Switch>
      </div>
    </section>
  </div>
);

export default App;
