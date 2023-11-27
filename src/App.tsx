import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { CustomPersonPage }
  from './components/CustomPersonPage/CustomPersonPage';
import { NotFoundPage } from './components/NotFound';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <main className="section">
        <div className="container">
          <div className="block">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="people">
                <Route index element={<PeoplePage />} />
                <Route path=":id" element={<PeoplePage />} />
                <Route
                  path="personalPage/:slug"
                  element={<CustomPersonPage />}
                />
              </Route>
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
};
