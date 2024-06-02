import { Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage, PeoplePage, Page404 } from './pages';

export const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" />} />
        <Route path="people/:person?" element={<PeoplePage />} />
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
};
