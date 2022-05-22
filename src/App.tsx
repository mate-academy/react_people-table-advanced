import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePages/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { Layout } from './components/Layout/Layout';
import { NewPerson } from './components/PeoplePages/NewPerson';
import { PeopleProvider } from './hoc/PeopleProvider';
import './App.scss';
import 'bulma';
import '@fortawesome/fontawesome-free/css/all.css';

const App: React.FC = () => {
  return (
    <PeopleProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate replace to="/" />} />
          <Route path="people" element={<PeoplePage />}>
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
          <Route path="people/new" element={<NewPerson />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </PeopleProvider>
  );
};

export default App;
