import cn from 'classnames';
import React, { memo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { SortBySexValues } from '../../types/SortSexValues';
import { getSearchWith } from '../../utils/searchHelper';
import { SearchLink } from '../../utils/SearchLink';
import { CenturyFilter } from '../CenturyFilter/CenturyFilter';
import { FilterByName } from '../FilterByName/FilterByName';

export const PeopleFilters = memo(
  () => {
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
          {SortBySexValues.map(value => (
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

        <FilterByName query={query} onChangeQuery={onChangeQuery} />

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
  },
);
