import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Sex } from '../types/Sex';

const centuriesBtn: number[] = [16, 17, 18, 19, 20];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');

  useEffect(() => {
    setQuery(searchParams.get('query') || '');
  }, [searchParams]);

  const setCenturyParam = (century: number): string[] => {
    const newParams = searchParams.getAll('centuries');

    if (newParams.includes(century.toString())) {
      return newParams.filter(param => param !== `${century}`);
    } else {
      newParams.push(`${century}`);

      return newParams;
    }
  };

  const isCenturyFilter = (century: number) => {
    return searchParams.getAll('centuries').includes(`${century}`);
  };

  const isCenturyEmpty = searchParams.getAll('centuries').length === 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set('query', newQuery);
    setQuery(newQuery);
    setSearchParams(newSearchParams);
  };

  const handleReset = () => {
    setQuery('');
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': !searchParams.has('sex') })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({
            'is-active': searchParams.get('sex') === Sex.male,
          })}
          params={{ sex: Sex.male }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({
            'is-active': searchParams.get('sex') === Sex.female,
          })}
          params={{ sex: Sex.female }}
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
            value={query}
            onChange={handleChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesBtn.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames('button', 'mr-1', {
                  'is-info': isCenturyFilter(century),
                })}
                params={{ centuries: setCenturyParam(century) }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button', 'is-success', {
                'is-outlined': !isCenturyEmpty,
              })}
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
          params={{ centuries: null, query: null, sex: null }}
          onClick={handleReset}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
