import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { Sex } from '../types/sex';
import classNames from 'classnames';
const CENTER_ARRAY = [16, 17, 18, 19, 20];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const cents = searchParams.getAll('centuries') || [];
  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    if (!event.target.value.length) {
      params.delete('query');
    } else {
      params.set('query', event.target.value);
    }

    setSearchParams(params);
  };

  const clickCentury = (newCent: string) => {
    const params = new URLSearchParams(searchParams);
    const newCenturies = cents.includes(newCent)
      ? cents.filter(cent => cent !== newCent)
      : [...cents, newCent];

    params.delete('centuries');
    newCenturies.forEach(c => params.append('centuries', c));
    setSearchParams(params);
  };

  const isFilter = (century: number) => {
    const selectedCenturies = searchParams.getAll('centuries');

    return selectedCenturies.includes(String(century));
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>
      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={!searchParams.get('sex') ? 'is-active' : ''}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={searchParams.get('sex') === Sex.MALE ? 'is-active' : ''}
          params={{ sex: Sex.MALE }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={searchParams.get('sex') === Sex.FEMALE ? 'is-active' : ''}
          params={{ sex: Sex.FEMALE }}
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
            onChange={handleChangeQuery}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>
      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTER_ARRAY.map(century => (
              <button
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': isFilter(century),
                })}
                onClick={() => clickCentury(String(century))}
              >
                {century}
              </button>
            ))}
          </div>
          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': cents.length,
              })}
              params={{ centuries: [] }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>
      <div className="panel-block">
        <a className="button is-link is-outlined is-fullwidth" href="#/people">
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
