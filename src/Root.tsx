import { HashRouter as Router } from 'react-router-dom';
import { Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { PeoplePage } from './components/PeoplePage';
import { PeopleProvider } from './store/PeopleContext';

export const Root = () => (
  <Router>
    <PeopleProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
          <Route index element={<h1 className="title">Home Page</h1>} />
          <Route path="home" element={<Navigate to="/" />} />

          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":personSlug" element={<PeoplePage />} />
          </Route>
        </Route>
      </Routes>
    </PeopleProvider>
  </Router>
);
