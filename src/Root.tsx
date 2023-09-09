import { Routes, Route, Navigate } from 'react-router-dom';
import { App } from './App';
import { PeoplePage } from './components/PeoplePage';

export const Root = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<h1 className="title">Home Page</h1>} />
      <Route path="people" element={<PeoplePage />}>
        <Route path=":personId" />
      </Route>

      <Route path="/home" element={<Navigate to="/" replace />} />

      <Route path="*" element={<h1 className="title">Page not found</h1>} />
    </Route>
  </Routes>
);
