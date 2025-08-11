import classNames from 'classnames';
import React from 'react';
import { Link, SetURLSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

interface Props {
  searchParams: URLSearchParams;
  sex: string | null;
  name: string;
  century: string[];
  setSearchParams: SetURLSearchParams;
}

export const PeopleFilters: React.FC<Props> = ({
  searchParams,
  sex,
  name,
  century,
  setSearchParams,
}) => {
  const centuries = Array.from({ length: 20 - 16 + 1 }, (_, i) =>
    (16 + i).toString(),
  );

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedParams: SearchParams = {
      name: event.target.value,
      sex,
      century,
    };

    setSearchParams(getSearchWith(searchParams, updatedParams));
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames({ 'is-active': sex === null })}
          to={{ search: getSearchWith(searchParams, { sex: null }) }}
        >
          All
        </Link>
        <Link
          className={classNames({ 'is-active': sex === 'm' })}
          to={{ search: getSearchWith(searchParams, { sex: 'm' }) }}
        >
          Male
        </Link>
        <Link
          className={classNames({ 'is-active': sex === 'f' })}
          to={{ search: getSearchWith(searchParams, { sex: 'f' }) }}
        >
          Female
        </Link>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={name}
            onChange={handleNameChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuries.map(centuryItem => (
              <Link
                key={centuryItem}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': century.includes(centuryItem),
                })}
                to={{
                  search: getSearchWith(searchParams, {
                    century: century.includes(centuryItem)
                      ? century.filter(i => centuryItem !== i)
                      : [...century, centuryItem],
                  }),
                }}
              >
                {centuryItem}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to={{ search: getSearchWith(searchParams, { century: [] }) }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{
            search: getSearchWith(searchParams, {
              sex: null,
              name: '',
              century: [],
            }),
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
