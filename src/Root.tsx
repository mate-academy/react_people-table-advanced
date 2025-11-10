import { Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import PeoplePage from './pages/PeoplePage';

const Root = () => (
  <App>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<Navigate to="/" />} />

      <Route path="/people" element={<PeoplePage />}>
        <Route path=":personSlug" element={<PeoplePage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </App>
);

export default Root;
