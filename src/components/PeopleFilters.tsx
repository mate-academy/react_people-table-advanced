import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { SexType } from '../types/Sex';
import { SearchLink } from './SearchLink';
import { getSearchParams, getSearchWith } from '../utils/searchHelper';
import { SearchLinkSex } from './SearchLinkSex';

const searchCenturies = ['16', '17', '18', '19', '20'];
const resetFilters = {
  query: null,
  sex: null,
  centuries: [],
};

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, sex, centuries] = useMemo(() => (
    getSearchParams(searchParams)
  ), [searchParams]);

  const getCenturies = useCallback((value: string) => {
    return centuries.includes(value)
      ? centuries.filter(el => el !== value)
      : [...centuries, value];
  }, [centuries]);

  const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const saerchQuery = getSearchWith(
      searchParams,
      { query: e.target.value.trimStart() },
    );

    setSearchParams(saerchQuery);
  };

  return (
    <div className="column is-7-tablet is-narrow-desktop">
      <nav className="panel">
        <p className="panel-heading">Filters</p>

        <p className="panel-tabs" data-cy="SexFilter">
          <SearchLinkSex
            sexType={SexType.All}
            sex={sex}
            title="All"
          />
          <SearchLinkSex
            sexType={SexType.Male}
            sex={sex}
            title="Male"
          />
          <SearchLinkSex
            sexType={SexType.Female}
            sex={sex}
            title="Female"
          />
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
              {searchCenturies.map(century => (
                <SearchLink
                  key={century}
                  params={{ centuries: getCenturies(century) }}
                  data-cy="century"
                  className={classNames(
                    'button',
                    'mr-1',
                    { 'is-info': centuries.includes(century) },
                  )}
                >
                  {century}
                </SearchLink>
              ))}
            </div>

            <div className="level-right ml-4">
              <SearchLink
                params={{ centuries: [] }}
                data-cy="centuryALL"
                className={classNames(
                  'button is-success',
                  { 'is-outlined': centuries.length !== 0 },
                )}
              >
                All
              </SearchLink>
            </div>
          </div>
        </div>

        <div className="panel-block">
          <SearchLink
            params={resetFilters}
            className="button is-link is-outlined is-fullwidth"
          >
            Reset all filters
          </SearchLink>
        </div>
      </nav>
    </div>
  );
};
