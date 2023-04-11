import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/Pages/HomePage/HomePage';
import { PeoplePage } from './components/Pages/PeoplePage/PeoplePage';
import { NotFoundPage } from './components/Pages/NotFoundPage/NotFoundPage';
import { Navigation } from './components/Navigation/Navigation';
import './App.scss';

export const App = () => (
  <div data-cy="app">
    <Navigation />

    <main className="section">
      <div className="container">

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />

          <Route path="/people">
            <Route index element={<PeoplePage />} />
            <Route path=":personId" element={<PeoplePage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </main>
  </div>
);
