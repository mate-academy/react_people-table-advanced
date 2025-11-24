import classNames from 'classnames';
import { NavLink, useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries');
  const isAllCenturies = centuries.length === 0;
  const sex = searchParams.get('sex'); // pode ser 'm', 'f' ou null
  const isAllSex = !sex; // true quando não há param

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set('query', value);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {(() => {
          const params = new URLSearchParams(searchParams.toString());

          params.delete('sex');

          return (
            <NavLink
              to={{
                pathname: '/people',
                search: params.toString() ? `?${params.toString()}` : '',
              }}
              className={classNames({ 'is-link': isAllSex })}
            >
              All
            </NavLink>
          );
        })()}

        {(() => {
          const params = new URLSearchParams(searchParams.toString());

          params.set('sex', 'm');

          return (
            <NavLink
              to={{ pathname: '/people', search: `?${params.toString()}` }}
              className={classNames({ 'is-link': sex === 'm' })}
            >
              Male
            </NavLink>
          );
        })()}

        {(() => {
          const params = new URLSearchParams(searchParams.toString());

          params.set('sex', 'f');

          return (
            <NavLink
              to={{ pathname: '/people', search: `?${params.toString()}` }}
              className={classNames({ 'is-link': sex === 'f' })}
            >
              Female
            </NavLink>
          );
        })()}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={searchParams.get('query') || ''}
            onChange={handleQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(c => {
              const newParams = new URLSearchParams(searchParams.toString());

              if (centuries.includes(c)) {
                // se já está selecionado, remove só esse
                newParams.delete('centuries');
                centuries
                  .filter(x => x !== c)
                  .forEach(x => newParams.append('centuries', x));
              } else {
                // se não está, adiciona mantendo os outros
                newParams.append('centuries', c);
              }

              return (
                <button
                  key={c}
                  type="button"
                  className={classNames('button', 'mr-1', {
                    'is-link': centuries.includes(c),
                  })}
                  onClick={() => setSearchParams(newParams)}
                >
                  {c}
                </button>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <button
              type="button"
              data-cy="centuryALL"
              className={classNames('button', {
                'is-success': isAllCenturies,
              })}
              onClick={() => {
                const newParams = new URLSearchParams(searchParams.toString());

                newParams.delete('centuries');
                setSearchParams(newParams);
              }}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <NavLink
          className="button is-link is-outlined is-fullwidth"
          to="/people"
        >
          Reset all filters
        </NavLink>
      </div>
    </nav>
  );
};
