import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getSearchWith, SearchParams } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

const CENTURIES = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = (searchParams.get('query') || '').trim().toLowerCase();

  const sex = searchParams.get('sex') || '';

  const centuries = searchParams.getAll('centuries') || [];

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || null });
  };

  const getUpdatedCenturies = (century: string) => {
    return centuries.includes(century)
      ? centuries.filter(c => c !== century)
      : [...centuries, century];
  };

  return (
    <>
      <nav className="panel">
        <p className="panel-heading">Filters</p>

        <p className="panel-tabs" data-cy="SexFilter">
          <SearchLink
            params={{ sex: null }}
            className={classNames({ 'is-active': !sex })}
          >
            All
          </SearchLink>

          <SearchLink
            params={{ sex: 'm' }}
            className={classNames({
              'is-active': sex === 'm',
            })}
          >
            Male
          </SearchLink>

          <SearchLink
            params={{ sex: 'f' }}
            className={classNames({
              'is-active': sex === 'f',
            })}
          >
            Female
          </SearchLink>
        </p>

        <div className="panel-block">
          <p className="control has-icons-left">
            <input
              data-cy="NameFilter"
              type="search"
              className="input"
              placeholder="Search"
              value={query}
              onChange={onQueryChange}
            />

            <span className="icon is-left">
              <i className="fas fa-search" aria-hidden="true" />
            </span>
          </p>
        </div>

        <div className="panel-block">
          <div
            className="level is-flex-grow-1 is-mobile"
            data-cy="CenturyFilter"
          >
            <div className="level-left">
              {CENTURIES.map(century => (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={classNames('button mr-1', {
                    'is-info': centuries.includes(century),
                  })}
                  params={{ centuries: getUpdatedCenturies(century) }}
                >
                  {century}
                </SearchLink>
              ))}
            </div>

            <div className="level-right ml-4">
              <SearchLink
                data-cy="centuryALL"
                className={classNames('button is-success', {
                  'is-outlined': centuries.length,
                })}
                params={{ centuries: null }}
              >
                All
              </SearchLink>
            </div>
          </div>
        </div>

        <div className="panel-block">
          <Link className="button is-link is-outlined is-fullwidth" to="?">
            Reset all filters
          </Link>
        </div>
      </nav>
    </>
  );
};
