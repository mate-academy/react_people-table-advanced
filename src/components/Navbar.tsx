import { Route } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Route path="/home">
          <a className="navbar-item" href="#/">
            Home
          </a>
          </Route>

          <Route path="/people">
          <a
            aria-current="page"
            className="navbar-item has-background-grey-lighter"
            href="#/people"
          >
            People
          </a>
          </Route>
        </div>
      </div>
    </nav>
  );
};
