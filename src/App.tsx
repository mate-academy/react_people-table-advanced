import { Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './pages/PeoplePage/PeoplePage';
import { Navbar } from './components/Navbar/Navbar';
import { Layout } from './components/Layout';
import { HomePage } from './pages/PeoplePage/HomePage/HomePage';
import { ErrorPage } from './pages/PeoplePage/ErrorPage/ErrorPage';
import './App.scss';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="/people" element={<PeoplePage />}>
                <Route path=":personSlug" element={<PeoplePage />} />
              </Route>
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};
