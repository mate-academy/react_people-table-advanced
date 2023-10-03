import {
  HashRouter, Route, Routes, Navigate,
} from 'react-router-dom';
import { App } from './App';
import { Home } from './Pages/Home/Home';
import { PeoplePage } from './Pages/PeoplePage/PeoplePage';
import { NotFound } from './components/NotFound/NotFound';

export const Root = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="people" element={<PeoplePage />}>
            <Route path=":personId?" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
