import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { App } from './App';
import { Home } from './components/Home';
import { People } from './components/PeoplePage';
import { NotFound } from './components/NotFound';

export const Root = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="people">
            <Route path=":slug?" element={<People />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
