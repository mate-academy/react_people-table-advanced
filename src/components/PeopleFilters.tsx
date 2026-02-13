/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames';
import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState<string>('');
  const centuries = searchParams.getAll('centuries') || [];

  function reset() {
    setInputValue('');
  }

  function setSearchWith(param: any) {
    const result = getSearchWith(searchParams, param);

    setSearchParams(result);
  }

  function handelQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const val = event.target.value.trimStart().trim();
    const result = val === '' ? { query: null } : { query: val };

    setInputValue(val);
    setSearchWith(result);
  }

  function sexFiller(value: string) {
    const result = ['f', 'm'].includes(value) ? { sex: value } : { sex: null };

    setSearchWith(result);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {['All', 'Male', 'Female'].map(option => {
          const short = option === 'All' ? '' : option[0].toLowerCase();

          return (
            <a key={option} className="" onClick={() => sexFiller(short)}>
              {option}
            </a>
          );
        })}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            value={inputValue}
            className="input"
            placeholder="Search"
            onChange={handelQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(number => {
              return (
                <Link
                  key={number}
                  data-cy="century"
                  className={classNames('button mr-1', {
                    'is-info': centuries.includes(number.toString()),
                  })}
                  to={{
                    search: getSearchWith(searchParams, {
                      centuries: centuries.includes(number)
                        ? centuries.filter(century => century !== number)
                        : [...centuries, number],
                    }),
                  }}
                >
                  {number}
                </Link>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href="#/people"
              onClick={reset}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
          onClick={reset}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
