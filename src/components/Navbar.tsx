// export const Navbar = () => {
//   return (
//     <nav
//       data-cy="nav"
//       className="navbar is-fixed-top has-shadow"
//       role="navigation"
//       aria-label="main navigation"
//     >
//       <div className="container">
//         <div className="navbar-brand">
//           <a className="navbar-item" href="#/">
//             Home
//           </a>

import classNames from 'classnames';

//           <a
//             aria-current="page"
//             className="navbar-item has-background-grey-lighter"
//             href="#/people"
//           >
//             People
//           </a>
//         </div>
//       </div>
//     </nav>
//   );
// };

import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  const selectedPage = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', { 'has-background-grey-lighter': isActive });

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/" className={selectedPage}>
            Home
          </NavLink>

          <NavLink aria-current="page" className={selectedPage} to="/people">
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
