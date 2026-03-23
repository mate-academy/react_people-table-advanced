import classNames from 'classnames';
import { Link, NavLink, useSearchParams } from 'react-router-dom';

type SearchParams = {
  [key: string]: string | string[] | null;
};

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries') || [];

  function setParamWith(
    params: SearchParams,
    search?: string | URLSearchParams,
  ): string {
    const newParams = new URLSearchParams(search);

    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        newParams.delete(key);
      } else if (Array.isArray(value)) {
        newParams.delete(key);
        value.forEach(i => newParams.append(key, i));
      } else {
        newParams.set(key, value);
      }
    });

    //setSearchParams(newParams);

    return newParams.toString();
  }

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      setParamWith({ query: event.target.value || null }, searchParams),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <NavLink
          to={{
            pathname: '/people',
            search: setParamWith({ sex: null }, searchParams),
          }}
          className={classNames({ 'is-active': !searchParams.has('sex') })}
        >
          All
        </NavLink>

        <NavLink
          to={{
            pathname: '/people',
            search: setParamWith({ sex: 'm' }, searchParams),
          }}
          className={classNames({ 'is-active': searchParams.has('sex', 'm') })}
        >
          Male
        </NavLink>
        <NavLink
          to={{
            pathname: '/people',
            search: setParamWith({ sex: 'f' }, searchParams),
          }}
          className={classNames({ 'is-active': searchParams.has('sex', 'f') })}
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
            onChange={handleChangeQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {[16, 17, 18, 19, 20].map(item => (
              <Link
                data-cy="century"
                key={item}
                to={{
                  pathname: '/people',
                  search: setParamWith(
                    {
                      centuries: centuries.includes(`${item}`)
                        ? centuries.filter(i => i !== `${item}`)
                        : [...centuries, `${item}`],
                    },
                    searchParams,
                  ),
                }}
                className={classNames('button', 'mr-1', {
                  'is-info': searchParams
                    .getAll('centuries')
                    .includes(`${item}`),
                })}
              >
                {item}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              to={{
                pathname: '/people',
                search: setParamWith({ centuries: null }, searchParams),
              }}
              className={classNames('button', 'is-success', {
                'is-outlined': searchParams.has('centuries'),
              })}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link className="button is-link is-outlined is-fullwidth" to="/people">
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
