import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from '../PeoplePage';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<h1 className="title">Home Page</h1>} />
      <Route path="/people">
        <Route
          index
          element={
            <>
              <h1 className="title">People Page</h1>
              <div className="block">
                <PeoplePage />
              </div>
            </>
          }
        />

        <Route
          path=":personSlug"
          element={
            <>
              <h1 className="title">People Page</h1>
              <div className="block">
                <PeoplePage />
              </div>
            </>
          }
        />
      </Route>
      <Route path="*" element={<h1 className="title">Page not found</h1>} />
      <Route path="/home" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default Router;
