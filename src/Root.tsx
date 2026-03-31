import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PeoplePage } from './pages/PeoplePage';
import { PeopleProvider } from './store/PeopleContext';
import { ParamsProvider } from './store/ParamsContext';
import { FilterProvider } from './store/filterContext';

export const Root = () => {
  return (
    <PeopleProvider>
      <Router>
        <ParamsProvider>
          <FilterProvider>
            <Routes>
              <Route path="/" element={<App />}>
                <Route
                  path="/home"
                  element={<Navigate to="/" replace={true} />}
                />
                <Route index element={<HomePage />} />
                <Route path="/people/:slug?" element={<PeoplePage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </FilterProvider>
        </ParamsProvider>
      </Router>
    </PeopleProvider>
  );
};
