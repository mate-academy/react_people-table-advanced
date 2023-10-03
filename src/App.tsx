import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { PageContent } from './components/PageContent';
import { Home } from './components/Home';
import { PeopleList } from './components/PeopleList';
import { NotFound } from './components/NotFound';

export const App = () => (
  <div data-cy="app">
    <Routes>
      <Route path="/" element={<PageContent />}>
        <Route index element={<Home />} />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="people" element={<PeopleList />}>
          <Route path=":personId" />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </div>
);
