import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

type FilterSearchParams = {
  centuries: ('16' | '17' | '18' | '19' | '20')[] | null;
  sex: 'f' | 'm' | null;
  query: string | null;
};

const defaultFilterSearchParams: FilterSearchParams = {
  centuries: null,
  query: null,
  sex: null,
};

const availableCenturies: FilterSearchParams['centuries'] = [
  '16',
  '17',
  '18',
  '19',
  '20',
];

export function createArrayOfSearchParams(
  searchParams: string[],
  newSearchValue: string,
) {
  return searchParams.includes(newSearchValue)
    ? searchParams.filter(searchParam => searchParam !== newSearchValue)
    : [...searchParams, newSearchValue];
}

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = (searchParams.get('sex') as FilterSearchParams['sex']) || '';
  const query =
    (searchParams.get('query') as FilterSearchParams['query']) || '';
  const centuries =
    (searchParams.getAll('centuries') as FilterSearchParams['centuries']) || [];

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value || null;

    setSearchParams(getSearchWith(searchParams, { query: newValue }));
  };

  return (
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
          className={classNames({ 'is-active': sex === 'm' })}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: 'f' }}
          className={classNames({ 'is-active': sex === 'f' })}
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
            {availableCenturies.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames('button', 'mr-1', {
                  'is-info': centuries.includes(century),
                })}
                params={{
                  centuries: createArrayOfSearchParams(centuries, century),
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button', 'is-success', {
                'is-outlined': centuries.length > 0,
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
            search: getSearchWith(searchParams, defaultFilterSearchParams),
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
