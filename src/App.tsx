import {
  useEffect, useState,
  createContext,
} from 'react';
import { Routes, Route } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';
import { getPeople } from './api';
import './App.scss';

export const PeopleContext = createContext([]);

export const App = () => {
  const [people, setPeople] = useState();
  const fetchData = async () => {
    const peopleData = await getPeople();

    setPeople(peopleData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <PeopleContext.Provider value={people}>
            <Routes>
              <Route path="/" element={<h1 className="title">Home Page</h1>} />
              <Route path="/people" element={<PeoplePage />} />
              <Route
                path="*"
                element={
                  <h1 className="title">Page not found</h1>
                }
              />
            </Routes>
          </PeopleContext.Provider>
        </div>
      </div>
    </div>
  );
};
