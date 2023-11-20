// import { useState } from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { Sex } from '../types/Sex';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // const { pathname, search } = useLocation();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('century') || [];
  const sex = searchParams.get('sex');
  const centurysArr = ['16', '17', '18', '19', '20'];

  const handleQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    event.preventDefault();

    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value);
    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={cn({
            'is-active': !sex,
          })}
          params={{
            sex: null,
          }}
        >
          All
        </SearchLink>
        <SearchLink
          className={cn({
            'is-active': sex === Sex.Male,
          })}
          params={{
            sex: Sex.Male,
          }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={cn({
            'is-active': sex === Sex.Female,
          })}
          params={{
            sex: Sex.Female,
          }}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            value={query}
            onChange={handleQueryChange}
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centurysArr.map((century) => {
              return (
                <SearchLink
                  key={century}
                  params={{
                    century: centuries.includes(century)
                      ? centuries.filter((c) => c !== century)
                      : [...centuries, century],
                  }}
                  data-cy="century"
                  className={cn('button', 'mr-1', {
                    'is-info': centuries.includes(century),
                  })}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>
          <div className="level-right ml-4">
            <SearchLink
              params={{
                century: null,
              }}
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuries.length,
              })}
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
            century: null,
            query: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
