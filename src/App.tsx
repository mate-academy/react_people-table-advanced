import './App.scss';

import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from './Layout';
import { PeoplePage } from './components/PeoplePage';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<h1 className="title">Home Page</h1>} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="people" element={<PeoplePage />}>
          <Route path=":slug" />
        </Route>
        <Route path="*" element={<h1 className="title">Page not found</h1>} />
      </Route>
    </Routes>
  );
};
