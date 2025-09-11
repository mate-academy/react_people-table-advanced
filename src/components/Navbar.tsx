import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link
            to="/"
            className={cn('navbar-item', {
              'has-background-grey-lighter': location.pathname === '/',
            })}
          >
            Home
          </Link>

          <Link
            to={{ pathname: '/people', search: location.search }}
            className={cn('navbar-item', {
              'has-background-grey-lighter':
                location.pathname.startsWith('/people'),
            })}
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

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
