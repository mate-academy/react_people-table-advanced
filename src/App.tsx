import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import { PeoplePage } from './components/PeoplePage';
import { PersonPage } from './components/PersonPage';

export const App = () => (
  <>
    <div data-cy="app">
      <Navbar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/people" element={<PeoplePage />}>
              <Route path=":slug" element={<PersonPage />} />
            </Route>
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  </>
);
