import { Routes, Route } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './components/pages/HomePage';
import { PeoplePage } from './components/pages/PeoplePage';
import { PageNotFound } from './components/pages/PageNotFound';

export const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path=":param?" element={<HomePage />} />

        <Route path="people" element={<PeoplePage />}>
          <Route path=":personId" element={<PeoplePage />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};
