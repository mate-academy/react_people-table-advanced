import React, { ChangeEvent } from 'react';
import cn from 'classnames';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';
import { FilterSex } from '../types/FilterSex';

type Props = {
  searchParams: URLSearchParams,
  setSearchParams: (value: URLSearchParams | string) => void,
  query: string,
};

export const PeopleFilters: React.FC<Props> = ({
  searchParams,
  setSearchParams,
  query,
}) => {
  const centuries = searchParams.getAll('century') || [];

  type FilterSex = keyof typeof FilterSex;
  const sexOptions: FilterSex[] = Object.keys(FilterSex) as FilterSex[];

  const allCenturies = ['16', '17', '18', '19', '20'];

  const getCenturies = (value: string) => {
    return centuries.includes(value)
      ? centuries.filter(century => century !== value)
      : [...centuries, value];
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newQuery = { query: event.target.value || null };
    const params = getSearchWith(searchParams, newQuery);

    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sexOptions.map(sex => (
          <SearchLink
            key={sex}
            className={cn({
              'is-active': searchParams.get('sex') === FilterSex[sex]
                || (searchParams.get('sex') === null && sex === FilterSex.All),
            })}
            params={{ sex: sex === FilterSex.All ? null : FilterSex[sex] }}
          >
            {sex}
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
            value={query || ''}
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
            {allCenturies.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={cn('button', 'mr-1', {
                  'is-info': centuries.includes(century),
                })}
                params={{ century: getCenturies(century) }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button', 'is-success', {
                'is-outlined': searchParams.getAll('century').length,
              })}
              params={{ century: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ sex: null, century: null, query: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
