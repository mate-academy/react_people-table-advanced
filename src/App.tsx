import { Routes, Route, Navigate } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';
import './App.scss';

export const App = () => (
  <div data-cy="app">
    <Navbar />
    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/" element={<h1 className="title">Home Page</h1>} />
          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":userSlug" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Routes>
      </div>
    </main>
  </div>
);

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
