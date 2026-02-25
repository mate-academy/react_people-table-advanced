// NavLink aplica a classe "active" automaticamente quando a rota corresponde
import { NavLink } from 'react-router-dom';
// classNames facilita a composição condicional de classes CSS
import classNames from 'classnames';

/**
 * Barra de navegação fixa no topo da página.
 * Usa NavLink do React Router para destacar o link ativo
 * com a classe 'has-background-grey-lighter'.
 */
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
          {/* Link para a página inicial — fica ativo apenas na rota "/" exata */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              classNames('navbar-item', {
                'has-background-grey-lighter': isActive,
              })
            }
          >
            Home
          </NavLink>

          {/* Link para a página de pessoas — fica ativo em "/people" e sub-rotas */}
          <NavLink
            to="/people"
            className={({ isActive }) =>
              classNames('navbar-item', {
                'has-background-grey-lighter': isActive,
              })
            }
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
