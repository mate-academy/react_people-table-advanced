import { Routes, Navigate, Route } from 'react-router-dom';
import { RootLayout } from './components/RootLayout';
import { PeoplePage } from './components/PeoplePage';
import './App.scss';

export const App = () => (
  <div data-cy="app">
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<h1 className="title">Home Page</h1>} />
        <Route path="home" element={<Navigate to="/" replace />} />

        <Route path="people">
          <Route index element={<PeoplePage />} />
          <Route path=":slug" element={<PeoplePage />} />
        </Route>

        <Route path="*" element={<h1 className="title">Page not found</h1>} />
      </Route>
    </Routes>
  </div>
);
