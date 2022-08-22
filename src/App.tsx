import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import 'bulma';
import './App.scss';
import { NotFoundPage } from './components/NotFoundPage';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';
import { NewPerson } from './components/NewPerson';

export const App: FC = () => (
  <div className="App">
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="home" element={<Navigate to="/" replace />} />
      <Route path="people" element={<PeoplePage />}>
        <Route path=":slug" element={<PeoplePage />} />
      </Route>
      <Route path="people/new" element={<NewPerson />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </div>
);
