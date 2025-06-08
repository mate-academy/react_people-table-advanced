import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { Status } from '../types/status';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

type Param = string | number;
type Params = {
  [key: string]: Param[] | Param | null;
};

type Props = {
  handleFilter: () => Person[];
};

const getSearchWith = (params: Params, search?: string | URLSearchParams) => {
  const newParams = new URLSearchParams(search);

  for (const [key, value] of Object.entries(params)) {
    if (value === null) {
      newParams.delete(key);
    } else if (value !== Status.All) {
      newParams.delete(key);
      newParams.set(key, value.toString());
    } else if (Array.isArray(value)) {
      newParams.delete(key);
      value.forEach(item => {
        return newParams.append(key, item.toString());
      });
    } else {
      newParams.set(key, value.toString());
    }
  }

  return newParams.toString();
};

export const PeopleFilters: React.FC<Props> = ({ handleFilter }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const ages = ['16', '17', '18', '19', '20'];

  const setSearchWith = (params: Params) => {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
    handleFilter();
  };

  const handleSexStatusChange = (value: Status) => {
    setSearchWith({ sex: value || null });
  };

  const handleQuerySearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || null });
  };

  const updateCenturies = (age: string) => {
    return centuries.includes(age)
      ? centuries.filter(century => century !== age)
      : [...centuries, age];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(Status).map(([key, value]) => (
          <SearchLink
            key={key}
            className={classNames({ 'is-active': sex === value })}
            params={{ sex: value || null }}
            onClick={() => handleSexStatusChange(value)}
          >
            {key}
          </SearchLink>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={handleQuerySearch}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {ages.map(age => (
              <SearchLink
                data-cy="century"
                key={age}
                params={{
                  centuries: updateCenturies(age),
                }}
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(age),
                })}
              >
                {age}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length,
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
          params={{ centuries: null, sex: null, query: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
