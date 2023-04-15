import { Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import './App.scss';
import { PeoplePageWrapper } from './components/PeoplePage/PeoplePageWrapper';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="/" element={<h1 className="title">Home Page</h1>} />

            <Route path="people">
              <Route index element={<PeoplePageWrapper />} />
              <Route path=":slug" element={<PeoplePageWrapper />} />
            </Route>
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};
