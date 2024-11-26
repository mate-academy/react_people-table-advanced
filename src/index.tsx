import { createRoot } from 'react-dom/client';
import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import { HomePage } from './pages/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { PeopleProvider } from './contsxts/PeopleContext';
import { ErrorProvider } from './contsxts/ErrorContext';
import { LoaderProvider } from './contsxts/LoaderContext';
import { PeopleFilteredProvider } from './contsxts/PeopleFilteredContext';
// import { SelectSortProvider } from './contsxts/SelectSortContext';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <PeopleProvider>
    {/* <SelectSortProvider> */}
    <PeopleFilteredProvider>
      <ErrorProvider>
        <LoaderProvider>
          <Router>
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<HomePage />} />
                <Route path="/home" element={<Navigate replace to={'/'} />} />
                <Route path="/people" element={<PeoplePage />}>
                  <Route path=":slug" element={<PeoplePage />} />
                </Route>

                <Route
                  path="*"
                  element={<h1 className="title">Page not found</h1>}
                />
              </Route>
            </Routes>
          </Router>
          ,
        </LoaderProvider>
      </ErrorProvider>
    </PeopleFilteredProvider>
    {/* </SelectSortProvider> */}
  </PeopleProvider>,
);
