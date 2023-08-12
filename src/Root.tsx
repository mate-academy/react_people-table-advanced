import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { App } from './App';
import HomePage from './pages/HomePage';
import PeoplePage from './pages/PeoplePage';
import HomeRedirect from './utils/HomeRedirect';
import NotFoundPage from './errors/NotFoundPage';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<HomeRedirect />} />
          <Route path="/people">
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
