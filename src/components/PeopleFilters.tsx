import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';

const CENTURIES = ['16', '17', '18', '19', '20'];

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const selectedCenturies = searchParams.getAll('centuries');

  // Оновлення пошукового запиту
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setSearchParams(
      getSearchWith(searchParams, {
        query: value || null,
      }),
    );
  };

  // Перемикання вибору століття (додавання/видалення з масиву)
  const getCenturyParams = (century: string) => {
    const nextCenturies = selectedCenturies.includes(century)
      ? selectedCenturies.filter(c => c !== century)
      : [...selectedCenturies, century];

    return {
      centuries: nextCenturies.length ? nextCenturies : null,
    };
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      {/* Sex Filter */}
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

      {/* Name Filter Input */}
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

      {/* Century Filter */}
      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES.map(century => {
              const isSelected = selectedCenturies.includes(century);

              return (
                <SearchLink
                  key={century}
                  data-cy="century"
                  params={getCenturyParams(century)}
                  className={classNames('button', 'mr-1', {
                    'is-info': isSelected,
                  })}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              params={{ centuries: null }}
              className={classNames('button', 'is-success', {
                'is-outlined': selectedCenturies.length > 0,
              })}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      {/* Reset All Filters Button */}
      <div className="panel-block">
        <SearchLink
          params={{
            query: null,
            sex: null,
            centuries: null,
          }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
