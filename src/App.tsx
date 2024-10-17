// import { PeoplePage } from './components/PeoplePage';
// import { Navbar } from './components/Navbar';

// import './App.scss';

// export const App = () => {
//   return (
//     <div data-cy="app">
//       <Navbar />

//       <div className="section">
//         <div className="container">
//           <h1 className="title">Home Page</h1>
//           <h1 className="title">Page not found</h1>
//           <PeoplePage />
//         </div>
//       </div>
//     </div>
//   );
// };

import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';
import { Routes, Navigate } from 'react-router-dom';
import './App.scss';
import { Route } from 'react-router-dom';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<h1 className="title">Home Page</h1>} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/people" element={<PeoplePage />}>
              <Route path="/people/:slug" element={<PeoplePage />} />
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
