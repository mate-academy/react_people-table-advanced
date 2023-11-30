import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

enum SexFilter {
  All = '',
  Male = 'm',
  Female = 'f',
}

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';
  const centuriesList = [16, 17, 18, 19, 20];

  function setSearchWith(params: any) {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  }

  function toggleCentury(century: number) {
    return getSearchWith({
      centuries: centuries.includes(century.toString())
        ? centuries.filter(item => item !== century.toString())
        : [...centuries, century.toString()],
    }, searchParams);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(SexFilter)
          .map(([key, value]: [key: string, value: string]) => (
            <SearchLink
              key={key}
              className={cn({
                'is-active': sex === value,
              })}
              params={{ sex: value || null }}
            >
              {key}
            </SearchLink>
          ))}
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
              setSearchWith({ query: event.target.value || null });
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
            {centuriesList.map(century => (
              <SearchLink
                data-cy="century"
                key={century}
                className={cn('button mr-1', {
                  'is-info': centuries.includes(century.toString()),
                })}
                params={{
                  search: toggleCentury(century),
                }}
              >
                {century}
              </SearchLink>
            ))}

            <div className="level-right ml-4">
              <SearchLink
                data-cy="centuryALL"
                className={cn('button is-success', {
                  'is-outlined': centuries.length,
                })}
                params={{ centuries: null }}
              >
                All
              </SearchLink>
            </div>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to="#/people"
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
