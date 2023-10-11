import { Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';
import './App.scss';
import { Home } from './components/Home';
import { PageNotFound } from './components/PageNotFound';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/people/:searchedSlug" element={<PeoplePage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
