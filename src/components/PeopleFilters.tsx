import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { SearchParams, getSearchWith } from '../utils/searchHelper';
import { GenderFilter } from './GenderFilter';

const CENTURIES_LINK = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';

  const gender = searchParams.get('sex') || '';

  const centuries = searchParams.getAll('centuries');

  function getLocationString(
    url: string,
    params: SearchParams,
    search?: string | URLSearchParams,
  ) {
    const searchLine = getSearchWith(new URLSearchParams(search || ''), params);

    if (searchLine) {
      return url + '?' + searchLine;
    } else {
      return url;
    }
  }

  function setSearchWith(params: any) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchWith({ query: event.target.value });
  }

  function toggleCentury(century: string) {
    return centuries.includes(century)
      ? centuries.filter(c => c !== century)
      : [...centuries, century];
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <GenderFilter gender={gender} searchParams={searchParams} />

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
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
            {CENTURIES_LINK.map(cent => (
              <Link
                key={cent}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(cent),
                })}
                to={getLocationString(
                  '/people',
                  { centuries: toggleCentury(cent) },
                  searchParams,
                )}
              >
                {cent}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames('button', {
                'is-success': !centuries.length,
                'is-outlined': centuries.length > 0,
              })}
              to={getLocationString(
                '/people',
                { centuries: null },
                searchParams,
              )}
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
