import './App.scss';
import { Navbar } from './components/Navbar';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { ErrorPage } from './pages/ErrorPage';

export const App = () => (
  <div data-cy="app">
    <html lang="en" className="has-navbar-fixed-top"></html>
    <Navbar />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/people">
            <Route index element={<PeoplePage />} />
            <Route path=":personId" element={<PeoplePage />} />
          </Route>
          <Route path="/home" element={<Navigate to="/" replace={true} />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </main>
  </div>
);