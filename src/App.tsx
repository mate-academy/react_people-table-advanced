import { Navbar } from './components/NavBar/Navbar';

import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { PeoplePage } from './pages/PeoplePage/PeoplePage';
import { PeopleProvider } from './store/PeopleContext';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/" element={<HomePage />} />
            <Route
              path="/people/:slug?"
              element={
                <PeopleProvider>
                  <PeoplePage />
                </PeopleProvider>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
