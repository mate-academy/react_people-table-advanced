import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { Person } from '../types';
import { FilterParam } from '../types/FilterParam';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';
import { Sex } from '../types/Sex';

type Props = {
  people: Person[]
};

export const PeopleFilters: React.FC<Props> = () => {
  const CENTURIES = ['16', '17', '18', '19', '20'];
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get(FilterParam.Query) || '';
  const centuries = searchParams.getAll(FilterParam.Centuries) || [];
  const sex = searchParams.get(FilterParam.Sex) || '';

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(getSearchWith(searchParams, {
      [FilterParam.Query]: event.target.value || null,
    }));
  };

  const handleCenturiesChange = (century: string) => {
    return (
      centuries.includes(century)
        ? centuries.filter(year => year !== century)
        : [...centuries, century]
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': !sex })}
          params={{ [FilterParam.Sex]: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': !sex })}
          params={{ [FilterParam.Sex]: Sex.Male }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': !sex })}
          params={{ [FilterParam.Sex]: Sex.Femail }}
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
            {CENTURIES.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={
                  classNames('button', 'mr-1', {
                    'is-info': centuries.includes(century),
                  })
                }
                params={{
                  [FilterParam.Centuries]: handleCenturiesChange(century),
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href="#/people"
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{
            [FilterParam.Centuries]: [],
            [FilterParam.Query]: null,
            [FilterParam.Sex]: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
