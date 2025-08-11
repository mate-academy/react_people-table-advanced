import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';
import { getSearchWith } from '../utils/searchHelper';
import { Sex } from '../types';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const centuriesArray = ['16', '17', '18', '19', '20'];

  const hasFilters = ['query', 'sex', 'centuries'].some(param =>
    searchParams.has(param),
  );

  const handleCenturyToggle = (century: string) => {
    const newCentury = centuries.includes(century)
      ? centuries.filter(cent => cent !== century)
      : [...centuries, century];

    return newCentury;
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': sex === Sex.empty })}
          params={{ sex: Sex.empty }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex === Sex.male })}
          params={{ sex: Sex.male }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex === Sex.female })}
          params={{ sex: Sex.female }}
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
            onChange={e =>
              setSearchParams(
                getSearchWith(searchParams, {
                  query: `${e.target.value}` || null,
                }),
              )
            }
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesArray.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                params={{ centuries: handleCenturyToggle(century) }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length !== 0,
              })}
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className={classNames('button is-link is-fullwidth', {
            'is-outlined': hasFilters,
          })}
          params={{ centuries: null, sex: null, query: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
