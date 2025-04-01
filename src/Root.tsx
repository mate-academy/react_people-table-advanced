import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import { App } from './App';
import { HomePage } from './pages/HomePage/HomePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { PeoplePage } from './pages/PeoplePage/PeoplePage';
import { HomeRedirect } from './components/HomeRedirect';

export const Root = () => (
  <Router
    future={{
      v7_relativeSplatPath: true,
      v7_startTransition: true,
    }}
  >
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />}></Route>
        <Route path="home" element={<HomeRedirect />}></Route>
        <Route path="people">
          <Route path=":slug?" element={<PeoplePage />}></Route>
        </Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Route>
    </Routes>
  </Router>
);
