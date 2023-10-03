import { Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import './App.scss';
import { HomePage } from './pages/HomePage';
import { NothingFound } from './pages/NotFind';
import { PeoplePage } from './pages/PeoplePage';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/" element={<HomePage />} />
            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":userSlug" element={<PeoplePage />} />
            </Route>
            <Route
              path="*"
              element={<NothingFound />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};
