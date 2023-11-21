import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

export const PeopleFilters = () => {
  const centuriesList = [16, 17, 18, 19, 20];
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || 'all';
  const centuries = searchParams.getAll('centuries') || [];

  const handleQuery = (ch: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('query', ch);

    const check = { query: ch };

    setSearchParams(params);
    if (!check.query) {
      params.delete('query');
      setSearchParams(params);
    }
  };

  const handleSex = (gender: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('sex', gender);
    if (gender === 'all') {
      params.delete('sex');
    }

    return params.toString();
  };

  const handleCenturies = (century: string) => {
    const params = new URLSearchParams(searchParams);

    const newCenturies = centuries.includes(century.toString())
      ? centuries.filter(cent => cent !== century.toString())
      : [...centuries, century];

    params.delete('centuries');
    if (century !== '') {
      newCenturies.forEach(cen => params.append('centuries', cen.toString()));
    }

    return params.toString();
  };

  const clear = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('sex');
    params.delete('centuries');
    params.delete('query');

    return params.toString();
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames({ 'is-active': sex === 'all' })}
          to={{ search: handleSex('all') }}
        >
          All
        </Link>
        <Link
          className={classNames({ 'is-active': sex === 'm' })}
          to={{ search: handleSex('m') }}
        >
          Male
        </Link>

        <Link
          className={classNames({ 'is-active': sex === 'f' })}
          to={{ search: handleSex('f') }}
        >
          Female
        </Link>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            value={query}
            type="search"
            className="input"
            placeholder="Search"
            onChange={(event) => handleQuery(event.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>

      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">

            {centuriesList.map(century => (
              <Link
                to={{ search: handleCenturies(century.toString()) }}
                key={century}
                data-cy="century"
                className={classNames(
                  'button mr-1', {
                    'is-info': centuries.includes(century.toString()),
                  },
                )}
              >
                {century}
              </Link>

            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames(
                'button is-success', { 'is-outlined': centuries.length },
              )}
              to={{ search: handleCenturies('') }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{ search: clear() }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
