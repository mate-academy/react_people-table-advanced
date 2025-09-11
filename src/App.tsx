import './App.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PeoplePage from './pages/PeoplePage';
import NotFoundPage from './pages/NotFoundPage';

export const App = () => (
  <div data-cy="app">
    <main className="section">
      <div className="container">
        <Navbar />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path={'/'} element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path={'people'}>
            <Route index element={<PeoplePage />} />
            <Route path={':slug'} element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </main>
  </div>
);

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
