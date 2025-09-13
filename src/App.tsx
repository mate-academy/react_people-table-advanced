import Navbar from './components/Navbar';
import HomePage from './Pages/HomePage';
import { PeoplePage } from './components/PeoplePage';
import PageNotFound from './Pages/NotFoundPage';
import './App.scss';
import { Routes, Route } from 'react-router-dom';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />
      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/people/:slug" element={<PeoplePage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
