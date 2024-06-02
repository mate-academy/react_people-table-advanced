import { Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './Pages/HomePage';
import { PeoplePage } from './Pages/PeoplePage';

export const Root = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route path="*" element={<h1 className="title">Page not found</h1>} />
      <Route path="home" element={<Navigate to="/" replace />} />
      <Route index element={<HomePage />} />
      <Route path="people">
        <Route index element={<PeoplePage />} />
        <Route path=":slug" element={<PeoplePage />} />
      </Route>
    </Route>
  </Routes>
);
