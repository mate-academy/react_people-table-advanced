import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage, NavBar, NotFoundPage, PeoplePage } from './components';

import './App.scss';

export const App = () => (
  <div data-cy="app">
    <NavBar />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/home" element={<Navigate to={'/'} replace />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/people">
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </main>
  </div>
);
