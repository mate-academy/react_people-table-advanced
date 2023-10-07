import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { PeoplePage } from './components/People/PeoplePage';
import { App } from './App';
import { HomePage } from './components/HomePage/HomePage';
import { NotFound } from './components/NotFound/NotFound';

export const Root = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="home" element={<Navigate to="/" replace />} />

      <Route path="people">
        <Route path=":personSlug?" element={<PeoplePage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);
