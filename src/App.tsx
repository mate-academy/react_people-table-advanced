import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './Pages/PeoplePage/PeoplePage';
import { Navbar } from './components/NavBar/Navbar';
import { PageNotFound } from './Pages/PageNotFound';
import { HomePage } from './Pages/HomePage';
import navItems from './Data/navItems.json';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar navItems={navItems} />

      <div className="section">
        <div className="container">

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />

            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":slug" element={<PeoplePage />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
