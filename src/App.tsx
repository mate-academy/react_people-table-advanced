import { Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { People } from './components/PeoplePage';
import './App.scss';
import { Home } from './components/Home';
import { NotFound } from './components/PageNotFound';

export const App = () => (
  <div data-cy="app">
    <Navbar />
    <Routes>
      <Route path="/">
        <Route path="/people">
          <Route index element={<People />} />
          <Route path=":personId" element={<People />} />
        </Route>
        <Route index element={<Home />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </div>
);
