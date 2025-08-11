import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';
import { useEffect } from 'react';
import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';

export const App = () => {
  useEffect(() => {
    document.documentElement.classList.add('has-navbar-fixed-top');

    return () => {
      document.documentElement.classList.remove('has-navbar-fixed-top');
    };
  }, []);

  return (
    <div data-cy="app">
      <Navbar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/home" element={<Navigate to="/" />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/people">
              <Route path=":peopleSlug?" element={<PeoplePage />}></Route>
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
