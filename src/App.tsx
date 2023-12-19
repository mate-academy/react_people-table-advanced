import { Outlet } from 'react-router-dom';
import './App.scss';
import { Navigation } from './components/Navigation/Navigation';

export const App = () => (
  <div data-cy="app">
    <Navigation />
    <main className="section">
      <div className="container">
        <Outlet />
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
