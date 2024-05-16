import { Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { PeoplePage } from './pages/PeoplePage';
import { Homepage } from './pages/Homepage';
import { NotFoundPage } from './pages/NotFoundPage';

export const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Homepage />} />
        <Route path="/home" element={<Navigate to="/" replace={true} />} />
        <Route path="people">
          <Route path=":personSlug?" element={<PeoplePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
