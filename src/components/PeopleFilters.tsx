import React, { memo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { NameFilter } from './NameFilter/NameFilter';
import { getSearchWith } from '../utils/searchHelper';

import { SearchLink } from './SearchLink';
import { CenturyFilter } from './CenturyFilter/CenturyFilter';
import { sortSexValues } from '../data/sortSexValues';

export const PeopleFilters = memo(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');
  const personSex = searchParams.get('sex');

  const onChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { query: event.target.value || null }),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sortSexValues.map(value => (
          <SearchLink
            key={value.id}
            className={cn({
              'is-active': personSex === value.sex,
            })}
            params={{ sex: value.sex }}
          >
            {value.title}
          </SearchLink>
        ))}
      </p>

      <NameFilter query={query} onChangeQuery={onChangeQuery} />

      <CenturyFilter />

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{ search: '' }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
});
