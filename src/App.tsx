import { Route, Routes } from 'react-router-dom';
import './App.scss';
import HomePage from './components/HomePage/HomePage';
import PeoplePage from './components/PeoplePage/PeoplePage';
import NotFound from './components/NotFound/NotFound';
import Layout from './components/Layout/Layout';
import PeopleContent from './components/PeopleContent/PeopleContent';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path=":param?" element={<HomePage />} />
        <Route path="/people" element={<PeoplePage />}>
          <Route
            path=":slug?"
            element={<PeopleContent loading={true} setLoading={() => {}} />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
