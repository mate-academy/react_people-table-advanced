import './App.scss';
import { Route, Routes, Navigate } from 'react-router-dom';
import {
  HomePage,
  PageNotfound,
  Navbar,
  PeoplePage,
} from './components/index';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />
      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="home" element={<Navigate to="/" replace />} />

            <Route path="*" element={<PageNotfound />} />
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
