import { Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/Pages/HomePage';
import { ErrorPage } from './components/Pages/ErrorPage';

import './App.scss';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="people">
          <Route index element={<PeoplePage />} />
          <Route path=":slug" element={<PeoplePage />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/home" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};
