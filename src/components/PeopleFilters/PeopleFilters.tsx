import React from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { getSearchWith } from '../../utils/searchHelper';
import { SearchLink } from '../SearchLink/SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const century = searchParams.getAll('century');

  const getActiveFilterClass = (filter: string) =>
    sex === filter ? 'is-active' : '';
  const filterCentury = ['16', '17', '18', '19', '20'];

  const setSearch = (params: {
    query?: string | null;
    century?: string[] | null;
  }) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch({ query: e.target.value || null });
  };

  const handleCentury = (cent: string) => {
    const newCent = century.includes(cent)
      ? century.filter(num => num !== cent)
      : [...century, cent];

    setSearch({ century: newCent || null });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink className={getActiveFilterClass('')} params={{ sex: null }}>
          All
        </SearchLink>
        <SearchLink className={getActiveFilterClass('m')} params={{ sex: 'm' }}>
          Male
        </SearchLink>
        <SearchLink className={getActiveFilterClass('f')} params={{ sex: 'f' }}>
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
            onChange={handleQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {filterCentury.map(cent => (
              <a
                key={cent}
                onClick={() => handleCentury(cent)}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': century.includes(cent),
                })}
              >
                {cent}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': !!century.length,
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
