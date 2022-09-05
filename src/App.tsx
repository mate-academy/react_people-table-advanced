// import { PeoplePage } from './components/PeoplePage';
import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';

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

export const App = () => (
  <div data-cy="app">
    <Navbar />

    <main className="section">
      <div className="container">
        <Outlet />
      </div>
    </main>
  </div>
);
