import React, { useEffect, useState } from 'react';
import {
  HashRouter, Redirect, Route, Switch,
}
  from 'react-router-dom';
import 'bulma';
import '@fortawesome/fontawesome-free';
import './App.scss';

import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import { NewPerson } from './components/NewPerson';
import { PeopleTable } from './components/PeopleTable';
import { getPeople } from './api/api';
import { ServerIPerson } from './api/interface';
import { Loader } from './components/Loader';
// import { Loader } from './components/Loader';

const App = () => {
  const [people, setPeople] = useState<ServerIPerson[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(result => {
        setPeople(result);
        setIsLoading(false);
      })
      .catch((e) => setError(e));
  }, []);

  return (
    <HashRouter>
      <div className="App">
        <Header />

        <Switch>
          <Route path="/people/new">
            <div className="form-popup">
              <NewPerson
                people={people}
                setPeople={setPeople}
              />
            </div>
          </Route>

          <Route path="/people">
            <h2>
              People page
            </h2>
            {
              isLoading
                ? (
                  <Loader />
                )
                : (
                  <PeopleTable
                    people={people}
                    setPeople={setPeople}
                    error={error}
                  />
                )
            }
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
