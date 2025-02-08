import { Routes, Route, Navigate } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { ErrorPage } from './components/ErrorPage';
import { useEffect } from 'react';
import './App.scss';

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
      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/people" element={<PeoplePage />} >
              <Route path=":slug?" element={<PeoplePage />}/>
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
