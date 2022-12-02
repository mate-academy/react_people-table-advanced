import { createRoot } from 'react-dom/client';
import {
  HashRouter as Router, Navigate, Route, Routes,
} from 'react-router-dom';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { App } from './App';
import { HomePage } from './components/HomePage';
import { PeopleList } from './components/PeopleList';
import { PageNotFound } from './components/PageNotFound';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route
            index
            element={<HomePage />}
          />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="people">
            <Route
              index
              element={<PeopleList />}
            />
            <Route
              path=":personLink"
              element={<PeopleList />}
            />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>,
  );
