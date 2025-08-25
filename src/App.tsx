// import { Loader } from './components/Loader';

import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { LayOut } from './components/Loader/layOut';
import { HomePage } from './components/mainSections/HomePage';
import { PeoplePage } from './components/mainSections/peoplePage';
import { NotFoundPage } from './components/mainSections/notFoundPage';
import { BlockOfPeople } from './components/blockOfPeople';

export const App = () => (
  <div data-cy="app">
    <Routes>
      <Route path="/" element={<LayOut />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="people" element={<PeoplePage />}>
          <Route
            path=""
            element={
              <BlockOfPeople
                isLoading={false}
                userQuery=""
                sexQuery=""
                agePeople={[]}
              />
            }
          />
          <Route
            path=":slug"
            element={
              <BlockOfPeople
                isLoading={false}
                userQuery=""
                sexQuery=""
                agePeople={[]}
              />
            }
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </div>
);
