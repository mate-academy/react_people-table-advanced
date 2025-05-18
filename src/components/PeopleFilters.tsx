import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const PeopleFilters = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const getNewSearch = (key: string, value: string) => {
    const searchParams = new URLSearchParams(location.search);

    if (key === 'centuries') {
      if (!value) {
        // Remover todos os séculos sem afetar o restante dos filtros
        searchParams.delete('centuries');
      } else {
        const values = searchParams.getAll(key);
        const valueIndex = values.indexOf(value);

        if (valueIndex >= 0) {
          // Já existe, então remove
          values.splice(valueIndex, 1);
        } else {
          // Não existe, então adiciona
          values.push(value);
        }

        // Limpa todos e adiciona os atualizados
        searchParams.delete(key);
        values.forEach(v => searchParams.append(key, v));
      }
    } else {
      if (value) {
        searchParams.set(key, value);
      } else {
        searchParams.delete(key);
      }
    }

    return `${location.pathname}?${searchParams.toString()}`;
  };

  const getClearedFiltersUrl = () => {
    const searchParams = new URLSearchParams(location.search);
    const filtersToClear = ['sex', 'centuries', 'query'];

    filtersToClear.forEach(key => {
      searchParams.delete(key);
    });

    const newSearch = searchParams.toString();

    return `${location.pathname}${newSearch ? `?${newSearch}` : ''}`;
  };

  useEffect(() => {
    const queryParam = new URLSearchParams(location.search).get('query');

    if (!queryParam) {
      setSearchQuery('');
    }
  }, [location.search]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    if (searchQuery.trim()) {
      searchParams.set('query', searchQuery.trim());
    } else {
      searchParams.delete('query');
    }

    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={!location.search.includes('sex=') ? 'is-active' : ''}
          to={getNewSearch('sex', '')}
        >
          All
        </Link>

        <Link
          className={location.search.includes('sex=m') ? 'is-active' : ''}
          to={getNewSearch('sex', 'm')}
        >
          Male
        </Link>

        <Link
          className={location.search.includes('sex=f') ? 'is-active' : ''}
          to={getNewSearch('sex', 'f')}
        >
          Female
        </Link>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {[16, 17, 18, 19, 20].map(century => (
              <Link
                key={century}
                data-cy="century"
                className={`button mr-1 ${location.search.includes(`centuries=${century}`) ? 'is-info' : ''}`}
                to={getNewSearch('centuries', century.toString())}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={`button is-success ${location.search.includes('centuries=') ? 'is-outlined' : ''}`}
              to={getNewSearch('centuries', '')}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={getClearedFiltersUrl()}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
