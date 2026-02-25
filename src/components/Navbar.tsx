// NavLink aplica a classe "active" automaticamente quando a rota corresponde
import { NavLink, useLocation } from 'react-router-dom';
// classNames facilita a composicao condicional de classes CSS
import classNames from 'classnames';

/**
 * Barra de navegacao fixa no topo da pagina.
 * Usa NavLink do React Router para destacar o link ativo
 * com a classe 'has-background-grey-lighter'.
 *
 * O link "People" preserva os search params atuais (filtros e ordenacao)
 * para manter a experiencia do usuario ao navegar.
 */
export const Navbar = () => {
  // Obtem a localizacao atual para preservar search params no link de People
  const location = useLocation();

  // Se o usuario ja esta em /people, preserva os search params atuais
  const peopleSearchParams = location.pathname.startsWith('/people')
    ? location.search
    : '';

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          {/* Link para a pagina inicial — fica ativo apenas na rota "/" exata */}
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

          {/* Link para a pagina de pessoas — preserva filtros/ordenacao via search params */}
          <NavLink
            to={{ pathname: '/people', search: peopleSearchParams }}
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
