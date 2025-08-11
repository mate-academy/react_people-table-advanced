import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { PeoplePage } from './components/PeoplePage';
import { HomePage } from './components/HomePage';
import { PeopleProvider } from './store/PeopleContext';

const HomeRedirect = () => {
  return <Navigate to="/" replace />;
};

export const Root = () => (
  <Router>
    <PeopleProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/home" element={<HomeRedirect />}></Route>
          <Route path="/" element={<HomePage />}></Route>
          <Route
            path="/people/:slug?"
            element={
              <PeoplePage
                filterItem={null}
                filterCentury={0}
                visiblePeople={[]}
              />
            }
          ></Route>
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Route>
      </Routes>
    </PeopleProvider>
  </Router>
);
