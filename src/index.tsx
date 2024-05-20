import { createRoot } from 'react-dom/client';
import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
  useLocation,
} from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';

export const Root = () => {
  const { pathname } = useLocation();

  if (pathname === '/home') {
    return <Navigate to="/"></Navigate>;
  }

  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />}></Route>
        <Route path="people" element={<PeoplePage />}>
          <Route path=":slug" index />
        </Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Route>
    </Routes>
  );
};

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Router>
    <Root />
  </Router>,
);
