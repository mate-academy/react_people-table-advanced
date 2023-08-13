import { Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';
import { PeoplePage } from './components/PeoplePage';
import { MainPage } from './components/MainPage';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route
          index
          element={<h1 className="title">Home Page</h1>}
        />
        <Route
          path="home"
          element={<Navigate to=".." replace />}
        />

        <Route
          path="people"
        >
          <Route index element={<PeoplePage />} />
          <Route path=":slug" element={<PeoplePage />} />
        </Route>

        <Route
          path="*"
          element={<h1 className="title">Page not found</h1>}
        />
      </Route>
    </Routes>
  );
};
