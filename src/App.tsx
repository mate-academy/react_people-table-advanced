import { Route, Routes } from 'react-router-dom';
import { PeoplePage } from './Pages/PeoplePage';
import { Navbar } from './components/Navbar';

import './App.scss';
import { HomePage } from './Pages/Home';
import { NotFound } from './Pages/NotFound';

export const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="people">
          <Route index element={<PeoplePage />} />
          <Route path=":slug" element={<PeoplePage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
