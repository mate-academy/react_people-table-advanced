import { SearchLink } from './SearchLink';
import classNames from 'classnames';
import { getSearchWith } from '../utils/searchHelper';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { FilterSex } from '../types/Enums';
import { centuries } from '../utils/centuries';

type Props = {
  activeSex: string | null;
  filterQuery: string | null;
  activeCenturies: string[];
};

export const PeopleFilters = ({
  activeSex,
  filterQuery,
  activeCenturies,
}: Props) => {
  const [searchValue, setSearchValue] = useState(filterQuery || '');
  const [searchParams, setSearchParams] = useSearchParams();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value || null;

    setSearchValue(event.target.value);
    setSearchParams(getSearchWith(searchParams, { query: newValue }));
  };

  const toggleCentury = (century: string) => {
    if (!activeCenturies.includes(century)) {
      return [...activeCenturies, century];
    }

    return activeCenturies.filter(activeCentury => activeCentury !== century);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': !activeSex })}
          params={{ sex: null }}
        >
          All
        </SearchLink>

        <SearchLink
          className={classNames({ 'is-active': activeSex === FilterSex.Male })}
          params={{ sex: FilterSex.Male }}
        >
          Male
        </SearchLink>

        <SearchLink
          className={classNames({
            'is-active': activeSex === FilterSex.Female,
          })}
          params={{ sex: FilterSex.Female }}
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
            value={searchValue}
            onChange={handleInputChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuries.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': activeCenturies.includes(century),
                })}
                params={{ centuries: toggleCentury(century) }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': !!activeCenturies.length,
              })}
              params={{ centuries: [] }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          onClick={() => setSearchValue('')}
          params={{ sex: null, query: null, centuries: [] }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
