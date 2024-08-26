import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { App } from './App';
import { PageNotFound } from './components/PageNotFound';
import { HomePage } from './components/HomePage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />

        <Route path="people" element={<PeoplePage />}>
          <Route path=":selectedPeople" element={<PageNotFound />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  </Router>
);
