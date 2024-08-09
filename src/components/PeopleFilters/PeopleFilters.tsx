import { Link, useSearchParams } from 'react-router-dom';
import { TypeSex } from '../../types/TypeSex';
import classNames from 'classnames';
import { getSearchWith } from '../../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const allCenturies = ['16', '17', '18', '19', '20'];

  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const trimmedQuery = event.target.value;
    const newSearch = getSearchWith(searchParams, {
      query: trimmedQuery || null,
    });

    setSearchParams(newSearch);
  }

  function handleReset() {
    searchParams.delete('sex');
    searchParams.delete('query');
    searchParams.delete('centuries');

    return searchParams.toString();
  }

  function updateCenturies(century: string) {
    return centuries.includes(century)
      ? centuries.filter(cen => cen !== century)
      : [...centuries, century];
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(TypeSex).map(([key, value]) => (
          <Link
            key={key}
            className={classNames({
              'is-active': value === sex,
            })}
            to={{
              pathname: '/people',
              search: getSearchWith(searchParams, {
                sex: value || null,
              }),
            }}
          >
            {key}
          </Link>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
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
            {allCenturies.map(century => (
              <Link
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                to={{
                  pathname: '/people',
                  search: getSearchWith(searchParams, {
                    centuries: updateCenturies(century),
                  }),
                }}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to={{
                pathname: '/people',
                search: getSearchWith(searchParams, { centuries: [] }),
              }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={handleReset()}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
