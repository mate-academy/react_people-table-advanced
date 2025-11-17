import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentSex = searchParams.get('sex') || '';
  const currentQuery = searchParams.get('query') || '';
  const currentCenturies = searchParams.getAll('centuries');

  const [inputValue, setInputValue] = useState(currentQuery);

  useEffect(() => {
    setInputValue(currentQuery);
  }, [currentQuery]);

  const updateQuery = (value: string) => {
    const trimmed = value.trim();

    navigate({
      search: getSearchWith(searchParams, {
        query: trimmed === '' ? null : trimmed,
      }),
    });
  };

  const centuriesList = ['16', '17', '18', '19', '20'];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={!currentSex ? 'is-active' : ''}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={currentSex === 'm' ? 'is-active' : ''}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={currentSex === 'f' ? 'is-active' : ''}
          params={{ sex: 'f' }}
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
            value={inputValue}
            onChange={event => {
              const value = event.target.value;

              setInputValue(value);
              updateQuery(value);
            }}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesList.map(century => {
              const isActive = currentCenturies.includes(century);

              const newList = isActive
                ? currentCenturies.filter(item => item !== century)
                : [...currentCenturies, century];

              return (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={`button mr-1 ${isActive ? 'is-info' : ''}`}
                  params={{ centuries: newList.length ? newList : null }}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{
            sex: null,
            query: null,
            centuries: null,
            sort: null,
            order: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
