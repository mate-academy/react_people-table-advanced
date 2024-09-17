import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { MainNav } from './components/MainNav';
import { PeoplePage } from './pages/PeoplePage';
import { HomePage } from './pages/HomePage';
import { PageNotFound } from './pages/PageNotFound';
import './App.scss';

export const App = () => {
  return (
    <div data-cy="app">
      <MainNav />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":slug" element={<PeoplePage />} />
            </Route>
          </Routes>
        </div>
      </main>
    </div>
  );
};
