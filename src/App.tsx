import './App.scss';

import { useState } from 'react';
import {
  Navigate, Route, Routes, useParams,
} from 'react-router-dom';
import { getPeople } from './api';
import { Person } from './types';
import { PeoplePage } from './components/PeoplePage';
import { Loader } from './components/Loader';
import { Navbar } from './components/Navbar';

export const App = () => {
  const [people, setPeople] = useState<Person[]>();
  const [isLoader, setisLoader] = useState(false);

  const PeoplePageg = () => {
    const { slug = '' } = useParams();

    return (
      <>
        {!isLoader ? (
          <PeoplePage people={people} selectedName={slug} />
        ) : (
          <Loader />
        )}
      </>
    );
  };

  getPeople()
    .then(setPeople)
    .catch(() => {
      setisLoader(true);

      return (
        <>
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        </>
      );
    });

  return (
    <div data-cy="app">
      <Navbar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<h1 className="title">Home Page</h1>} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/people">
              <Route index element={<PeoplePageg />} />
              <Route path="/people/:slug" element={<PeoplePageg />} />
            </Route>

            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};
