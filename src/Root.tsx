import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { PeoplePage } from './components/PeoplePage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<h1 className="title">Home Page</h1>}></Route>
        <Route path="home" element={<Navigate to={'/'} replace />}></Route>

        <Route path="people">
          <Route
            path=":slug?"
            element={
              <>
                <h1 className="title">People Page</h1> <PeoplePage />{' '}
              </>
            }
          ></Route>
        </Route>

        <Route
          path="*"
          element={<h1 className="title">Page not found</h1>}
        ></Route>
      </Route>
    </Routes>
  </Router>
);
