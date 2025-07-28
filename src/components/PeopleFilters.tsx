import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';

const CENTURIES = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const valueOfCenturies = searchParams.getAll('centuries') || [];

  const getParamsToUpdate = (data: string): string[] => {
    const array = [...valueOfCenturies];

    if (array.includes(data)) {
      return array.filter(ch => ch !== data);
    } else {
      array.push(data);

      return array;
    }
  };

  const handleSetQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = getSearchWith(searchParams, {
      query: e.target.value || null,
    });

    setSearchParams(params);
  };

  const getClass = (data: string) => {
    return classNames({ 'is-active': searchParams.get('sex') === data });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({
            'is-active': !searchParams.has('sex'),
          })}
        >
          All
        </SearchLink>
        <SearchLink params={{ sex: 'm' }} className={getClass('m')}>
          Male
        </SearchLink>
        <SearchLink params={{ sex: 'f' }} className={getClass('f')}>
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
            onChange={handleSetQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES.map(item => (
              <SearchLink
                key={item}
                data-cy="century"
                params={{ centuries: getParamsToUpdate(item) }}
                className={classNames('button mr-1', {
                  'is-info': valueOfCenturies.includes(item),
                })}
              >
                {item}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              params={{ centuries: [] }}
              className={classNames('button', 'is-success', {
                'is-outlined': searchParams.has('centuries'),
              })}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{ query: null, sex: null, centuries: [] }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
