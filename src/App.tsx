import './App.scss';
import 'bulma/css/bulma.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Page404 } from './components/Page404/Page404';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { NavBar } from './components/Navbar/NavBar';

export const App: React.FC = () => {
  return (
    <div className="App">
      <NavBar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={<h1 className="title level-item">Home Page</h1>}
            />
            <Route path="home" element={<Navigate to="/" />} />
            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":slug" element={<PeoplePage />} />
            </Route>
            <Route path="/*" element={<Page404 />} />
          </Routes>
        </div>
      </div>

    </div>
  );
};
