import { HashRouter, Navigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { App } from './App';
import { Routing } from './Routing/Routing';
import { Loader } from './components/Loader';

const { HomePage, PeoplePage, NotFoundPage } = Routing;

export const Root = () => (
  <HashRouter>
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" />} />

          <Route path="people">
            <Route path=":personId?" element={<PeoplePage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  </HashRouter>
);
