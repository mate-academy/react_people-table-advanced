import { Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { PageNotFound } from './components/PageNotFound';
import './App.scss';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/people" element={<PeoplePage />}>
              <Route path="/people/:slug" element={<PeoplePage />} />
            </Route>
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
