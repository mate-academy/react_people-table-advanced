import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import Layout from './components/Layout';
import HomePage from './pages/Home.page';
import ErrorPage from './pages/Error.page';
import PeoplePage from './pages/People.page';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />

        <Route path="people">
          <Route path=":personSlug?" element={<PeoplePage />} />
        </Route>

        <Route path="home" element={<Navigate to="/" />} />

        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};
