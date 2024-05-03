import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Sex } from '../types/Sex';
import { Sort } from '../types/Sort';
import { SearchLink } from './SearchLink';

export const PeopleFilters: React.FC = () => {
  const [nameFilter, setNameFilter] = useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get(Sort.Sex);
  const centuries = searchParams.getAll('centuries');

  const centuriesArray: string[] = ['16', '17', '18', '19', '20'];

  // If the query is empty, remove it from the URL
  useEffect(() => {
    if (!nameFilter.length) {
      searchParams.delete('query');
      setSearchParams(searchParams);
    } else {
      searchParams.set('query', nameFilter);
      setSearchParams(searchParams);
    }
  }, [nameFilter, searchParams, setSearchParams]);

  const getUpdatedCenturies = (century: string) => {
    // If the century is selected now, remove it - else - add it to the array
    return centuries.includes(century)
      ? centuries.filter((currentCent: string) => currentCent !== century)
      : [...centuries, century];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': sex === null })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex === Sex.M })}
          params={{ sex: Sex.M }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex === Sex.F })}
          params={{ sex: Sex.F }}
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
            value={nameFilter}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setNameFilter(event.target.value);
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
            {centuriesArray.map((century: string) => (
              <SearchLink
                params={{ centuries: getUpdatedCenturies(century) }}
                className={classNames('button', 'mr-1', {
                  'is-info': !getUpdatedCenturies(century).includes(century),
                })}
                data-cy="century"
                key={century}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: [] }}
              className={classNames('button', 'is-success', {
                'is-outlined': searchParams.has('centuries'),
              })}
              data-cy="centuryALL"
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{ sex: null, centuries: [] }}
          onClick={() => setNameFilter('')}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
