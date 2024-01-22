import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { getSearchWith } from '../utils/searchHelper';
import { Sex } from '../types';

interface Props {
  toggleSortSex: (sort: Sex) => void
  updateCenturies: (century: number) => void
  updateQuery: (query: string) => void
  resetFilters: () => void
}

export const PeopleFilters: React.FC<Props> = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    toggleSortSex, updateCenturies, updateQuery, resetFilters,
  } = props;

  const query = searchParams.get('query') || '';
  const sexFilter = searchParams.get('sex') || null;
  const centuriesFilter = searchParams.getAll('century');

  const centuriesArray = ['16', '17', '18', '19', '20'];

  const handleQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchParams(
      getSearchWith(searchParams, {
        query: event.target.value,
      }),
    );
    updateQuery(event.target.value);
  };

  const toggleCenturyFilter = (century: string) => {
    return centuriesFilter.includes(century)
      ? centuriesFilter.filter(ch => century !== ch)
      : [...centuriesFilter, century];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={cn({ 'is-active': !sexFilter })}
          to={{ search: getSearchWith(searchParams, { sex: null }) }}
          onClick={() => toggleSortSex('')}
        >
          All
        </Link>

        <Link
          className={cn({ 'is-active': sexFilter === 'm' })}
          to={{ search: getSearchWith(searchParams, { sex: 'm' }) }}
          onClick={() => toggleSortSex('m')}
        >
          Male
        </Link>

        <Link
          className={cn({ 'is-active': sexFilter === 'f' })}
          to={{ search: getSearchWith(searchParams, { sex: 'f' }) }}
          onClick={() => toggleSortSex('f')}
        >
          Female
        </Link>
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
            {centuriesArray.map(century => (
              <Link
                key={century}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuriesFilter.includes(century),
                })}
                to={{
                  search: getSearchWith(
                    searchParams,
                    { century: toggleCenturyFilter(century) },
                  ),
                }}
                onClick={() => updateCenturies(parseInt(century, 10))}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuriesFilter.length,
              })}
              to={{
                search: getSearchWith(
                  searchParams,
                  { century: null },
                ),
              }}
              onClick={() => updateCenturies(0)}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{
            search: getSearchWith(
              searchParams, {
                sex: null, query: null, century: null,
              },
            ),
          }}
          onClick={resetFilters}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
