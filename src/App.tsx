import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './Components/HomePage/HomePage';
import { PageNotFound } from './Components/PageNotFound/PageNotFound';
import { PeoplePage } from './Components/PeoplePage/PeoplePage';
import { Menu } from './Components/Menu/Menu';
import './App.scss';

export const App = () => (
  <div className="App">
    <Menu />
    <h1 className="title">
      People table
    </h1>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="home" element={<Navigate to="/" />} />
      <Route path="people/" element={<PeoplePage />}>
        <Route path=":slug" element={<PeoplePage />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </div>
);
