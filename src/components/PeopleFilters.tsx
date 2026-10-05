import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const queryValue = searchParams.get('query') || '';
  const centuriesSelected = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const handleQueryChange = (value: string) => {
    const search = getSearchWith(searchParams, { query: value ? value : null });

    setSearchParams(search);
  };

  const getUpdatedCenturies = (newCentury: string) => {
    return centuriesSelected.includes(newCentury)
      ? centuriesSelected.filter(century => century !== newCentury)
      : [...centuriesSelected, newCentury];
  };

  const getNewCenturyAddress = (century: string) => {
    return {
      centuries: getUpdatedCenturies(century),
    };
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={cn({ 'is-active': sex === '' })}
        >
          All
        </SearchLink>
        <SearchLink
          className={cn({ 'is-active': sex === 'm' })}
          params={{
            sex: 'm',
          }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={cn({ 'is-active': sex === 'f' })}
          params={{
            sex: 'f',
          }}
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
            value={queryValue}
            onChange={event => handleQueryChange(event.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuriesSelected.includes(century),
                })}
                params={getNewCenturyAddress(century)}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuriesSelected.length,
              })}
              params={{
                centuries: [],
              }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{
            pathname: '/people',
            search: getSearchWith(new URLSearchParams(), {
              sort: sort ? sort : null,
              order: order ? order : null,
            }),
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
