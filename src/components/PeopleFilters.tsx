import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { FilterOptions, GenderStatus } from '../types/variables';
import { SearchLink } from './SearchLink';
import { useCallback } from 'react';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get('searchTerm') || '';
  const sex = searchParams.get('sex') || null;
  const centuries = searchParams.getAll('centuries') || [];

  const setSearchWith = useCallback(
    (params: FilterOptions) => {
      const search = getSearchWith(searchParams, params);

      setSearchParams(search);
    },
    [searchParams, setSearchParams],
  );

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchWith({
      searchTerm: event.target.value || null,
      sex: null,
      selectedCenturies: [],
      sortBy: null,
      sortOrder: null,
    });
  };

  const getNewCenturies = (newCentury: string) => {
    const newSelectedCenturies = centuries.includes(newCentury)
      ? centuries.filter(century => century !== newCentury)
      : [...centuries, newCentury];

    return newSelectedCenturies;
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="GenderFilter">
        <SearchLink
          params={{ sex: null }}
          className={cn({ 'is-active': !sex })}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: GenderStatus.Male }}
          className={cn({ 'is-active': sex === GenderStatus.Male })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: GenderStatus.Female }}
          className={cn({ 'is-active': sex === GenderStatus.Female })}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <input
          type="search"
          className="input"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(century => (
              <SearchLink
                key={century}
                params={{ centuries: getNewCenturies(century) }}
                className={cn('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: [] }}
              className={cn('button mr-1 is-success', {
                'is-outlined': centuries.length,
              })}
              data-cy="centuryALL"
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{
            sex: null,
            searchTerm: null,
            selectedCenturies: [],
            sortBy: null,
            sortOrder: null,
          }}
          className={cn('button is-link is-outlined is-fullwidth')}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
