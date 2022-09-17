import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';

  const onInputChange = (inputValue: string) => {
    const newParams = getSearchWith(searchParams,
      { query: inputValue || null });

    setSearchParams(newParams);
  };

  return (
    <div className="container">
      <nav className="panel">
        <p className="panel-heading">Filters</p>

        <p className="panel-tabs" data-cy="SexFilter">
          <SearchLink
            className={classNames({ 'is-active': sex === '' })}
            params={{ sex: null }}
          >
            All
          </SearchLink>

          <SearchLink
            className={classNames({ 'is-active': sex === 'm' })}
            params={{ sex: 'm' }}
          >
            Male
          </SearchLink>

          <SearchLink
            className={classNames({ 'is-active': sex === 'f' })}
            params={{ sex: 'f' }}
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
              onChange={(e) => {
                onInputChange(e.currentTarget.value);
              }}
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
              {['16', '17', '18', '19', '20'].map(element => (
                <Link
                  key={element}
                  data-cy="century"
                  className={classNames(
                    'button mr-1',
                    {
                      'is-info': centuries.includes(element),
                    },
                  )}
                  to={{
                    search: getSearchWith(searchParams, {
                      centuries: centuries.includes(element)
                        ? centuries.filter(century => century !== element)
                        : [...centuries, element],
                    }),
                  }}
                >
                  {element}
                </Link>
              ))}
            </div>

            <div className="level-right ml-4">
              <Link
                data-cy="centuryALL"
                className="button is-success is-outline"
                to={{
                  search: getSearchWith(searchParams, {
                    centuries: ['16', '17', '18', '19', '20'],
                  }),
                }}
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
    </div>
  );
};
