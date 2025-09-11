import { NavLink, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const name = searchParams.get('name') || '';
  const centuries = searchParams.getAll('centuries');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    if (event.target.value) {
      params.set('name', event.target.value);
    } else {
      params.delete('name');
    }

    setSearchParams(params);
  };

  const handleCenturyClick = (value: string) => {
    const params = new URLSearchParams(searchParams);
    const current = params.getAll('centuries');

    if (current.includes(value)) {
      const updated = current.filter(century => century !== value);

      params.delete('centuries');

      updated.forEach(century => params.append('centuries', century));
    } else {
      params.delete('centuries');
      [...current, value].forEach(century =>
        params.append('centuries', century),
      );
    }

    setSearchParams(params);
  };

  const handleAllCenturiesClick = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');

    setSearchParams(params);
  };

  const handleResetAll = () => setSearchParams({});

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <NavLink
          to={{
            pathname: '/people',
            search: (() => {
              const params = new URLSearchParams(searchParams);

              params.delete('sex');

              return params.toString();
            })(),
          }}
          end
          className={() => classNames({ 'is-active': !sex })}
        >
          All
        </NavLink>

        <NavLink
          to={{
            pathname: '/people',
            search: (() => {
              const params = new URLSearchParams(searchParams);

              params.set('sex', 'm');

              return params.toString();
            })(),
          }}
          className={() => classNames({ 'is-active': sex === 'm' })}
        >
          Male
        </NavLink>

        <NavLink
          to={{
            pathname: '/people',
            search: (() => {
              const params = new URLSearchParams(searchParams);

              params.set('sex', 'f');

              return params.toString();
            })(),
          }}
          className={() => classNames({ 'is-active': sex === 'f' })}
        >
          Female
        </NavLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={name}
            onChange={handleNameChange}
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
              <button
                key={century}
                data-cy="century"
                className={classNames('button', 'mr-1', {
                  'is-info': centuries.includes(String(century)),
                })}
                onClick={() => handleCenturyClick(String(century))}
              >
                {century}
              </button>
            ))}
          </div>
          <div className="level-right ml-4">
            <button
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={handleAllCenturiesClick}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          className="button is-link is-outlined is-fullwidth"
          onClick={handleResetAll}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
