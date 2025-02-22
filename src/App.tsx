import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { RandomPage } from './pages/RandomPage';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { Navbar } from './components/Navbar';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="*" element={<RandomPage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/" element={<HomePage />} />
            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":slug" element={<PeoplePage />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};
