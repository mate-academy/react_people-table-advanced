import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';
import { Sort } from '../types/Sort';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputSearch, setInputSearch] = useState('');

  const centuries = searchParams.getAll(Sort.centuries) || [];
  const sex = searchParams.get(Sort.sex) || null;
  const centuriesMain = ['16', '17', '18', '19', '20'];

  const handleCenturies = (value: string) => {
    if (centuries.includes(value)) {
      return { centuries: centuries.filter(year => year !== value) };
    }

    return { centuries: [value, ...centuries] };
  };

  const handleInputSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(event.target.value);

    if (event.target.value === '') {
      setSearchParams(getSearchWith(searchParams, { query: null }));

      return;
    }

    setSearchParams(getSearchWith(searchParams, { query: event.target.value }));
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({
            'is-active': !sex?.includes(Sort.male)
              && !sex?.includes(Sort.female),
          })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex?.includes(Sort.male) })}
          params={{ sex: Sort.male }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex?.includes(Sort.female) })}
          params={{ sex: Sort.female }}
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
            value={inputSearch}
            onChange={(event) => handleInputSearch(event)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {
              centuriesMain.map(century => (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={classNames('button mr-1', {
                    'is-info': centuries.includes(century),
                  })}
                  params={handleCenturies(century)}
                >
                  {century}
                </SearchLink>
              ))
            }
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': !centuriesMain
                  .every(century => !centuries.includes(century)),
              })}
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to="/people"
          // params={{ centuries: null, sex: null }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
