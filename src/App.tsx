import 'bulma/css/bulma.css';
import './App.scss';
import {
  Routes, Route, Navigate,
} from 'react-router-dom';
import { PeoplePage } from './PeoplePage';
import { Home } from './Home';
import { NotFoundPage } from './NotFoundPage';
import { Header } from './Header';

export const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/home"
          element={<Navigate to="/" />}
        />
        <Route path="/people">
          <Route index element={(<PeoplePage />)} />
          <Route path=":personSlug" element={(<PeoplePage />)} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};
