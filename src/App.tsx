import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { getPeople } from './api/api';

import './App.scss';
import { Header } from './Components/Header/Header';
import { HomePage } from './Components/HomePage/HomePage';
import { PageNotFound } from './Components/Notification/PageNotFound';
import { Peoples } from './Components/Peoples/Peoples';
import { People } from './types/People';

const App: React.FC = () => {
  const [people, setPeople] = useState<People[]>([]);

  const fetchUsers = async () => {
    const usersFromServer = await getPeople();

    setPeople(usersFromServer);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="/people/*" element={<Peoples people={people} setPeople={setPeople} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default App;
