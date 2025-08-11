import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';

import { SearchLink } from './SearchLink';
import { GenderFields } from '../types/GenderFields';
import { SearchParams, getSearchWith } from '../utils/searchHelper';

const CENTURIES = [16, 17, 18, 19, 20];

const genderOptions = [
  { label: 'All', params: { sex: null } },
  { label: 'Male', params: { sex: GenderFields.Male } },
  { label: 'Female', params: { sex: GenderFields.Female } },
];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || null;
  const centuries = searchParams.getAll('centuries') || [];

  const setSearchWith = (params: SearchParams) => {
    const newParams = getSearchWith(searchParams, params);

    setSearchParams(newParams);
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: e.target.value || null });
  };

  const getNewCenturies = (century: string) => {
    return centuries.includes(century)
      ? centuries.filter(prevCentury => prevCentury !== century)
      : [...centuries, century];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {genderOptions.map(({ label, params }) => (
          <SearchLink
            key={label}
            params={params}
            className={cn({ 'is-active': sex === params.sex })}
          >
            {label}
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
            onChange={handleSearchInput}
            value={query}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuries.includes(`${century}`),
                })}
                params={{ centuries: getNewCenturies(`${century}`) }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: [] }}
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuries.length,
              })}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ query: null, sex: null, centuries: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
