import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const listCenturies = ['16', '17', '18', '19', '20'];
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || null;
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');

  const createSex = (a: string | null) => {
    if (a === null) {
      searchParams.delete('sex');
    } else {
      searchParams.set('sex', a);
    }

    return searchParams.toString();
  };

  const createQuery = (quer: string) => {
    if (quer === '') {
      searchParams.delete('query');
    } else {
      searchParams.set('query', quer);
    }

    setSearchParams(searchParams);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames({ 'is-active': sex === null })}
          to={{
            search: createSex(null),
          }}
        >
          All
        </Link>
        <Link
          className={classNames({ 'is-active': sex === 'm' })}
          to={{
            search: createSex('m'),
          }}
        >
          Male
        </Link>
        <Link
          className={classNames({ 'is-active': sex === 'f' })}
          to={{
            search: createSex('f'),
          }}
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
            value={query}
            onChange={(event) => {
              createQuery(event.target.value);
            }}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {listCenturies.map(centurie => (
              <Link
                key={centurie}
                data-cy="century"
                className={classNames(
                  'button mr-1',
                  { 'is-info': centuries.includes(centurie) },
                )}
                to="/"
              >
                {centurie}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to="/people"
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
