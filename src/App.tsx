import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { PeopleTable } from './components/People/PeopleTable/PeopleTable';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import { getPeople } from './api/peopleApi';
import { Person } from './types/Person';

import './App.scss';

export const App: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  const fetchPeople = async () => {
    const peopleList = await getPeople();

    setPeople(peopleList);
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/people/*" element={<PeopleTable people={people} setPeople={setPeople} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};
