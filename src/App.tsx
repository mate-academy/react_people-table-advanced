import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';

import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Container } from './components/Container';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />
      <Routes>
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="/" element={<Container />}>
          <Route index element={<h1 className="title">Home Page</h1>}></Route>
          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":personData" element={<PeoplePage />} />
          </Route>
        </Route>
        <Route
          path="*"
          element={<h1 className="title">Page not found</h1>}
        ></Route>
      </Routes>
    </div>
  );
};
