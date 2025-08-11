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
import { PeopleProvider } from './contexts/PeopleContext';
import { ErrorProvider } from './contexts/ErrorContext';
import { LoaderProvider } from './contexts/LoaderContext';
import { PeopleFilteredProvider } from './contexts/PeopleFilteredContext';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <PeopleProvider>
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
        </LoaderProvider>
      </ErrorProvider>
    </PeopleFilteredProvider>
  </PeopleProvider>,
);
