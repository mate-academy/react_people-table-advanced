import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Navbar } from './components/Navbar';
import { PeoplePage } from './components/PeoplePage';

const PageNotFound = () => <h1 className="title">Page not found</h1>;
const HomePage = () => <h1 className="title">Home Page</h1>;

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />
      <div className="section">
        <div className="container">
          <Routes>
            <Route path="*" element={<PageNotFound />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/people" element={<PeoplePage />}>
              <Route path=":slug?" />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};
