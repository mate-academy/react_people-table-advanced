import React, { useState } from 'react';
import classNames from 'classnames';
import { Filter } from '../utils/filterHelper';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sexParam = searchParams.get('sex');
  const filters: Filter =
    sexParam === 'm' ? 'male' : sexParam === 'f' ? 'female' : 'all';
  const [inputValue, setInputValue] = useState(query);
  const centuries = searchParams.getAll('centuries') || [];

  const setSearchWith = (params: URLSearchParams, newParam: SearchParams) => {
    const search = getSearchWith(params, newParam);

    setSearchParams(search);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setInputValue(value);
    setSearchWith(searchParams, { query: value || null });
  };

  const handleUpdateFilter = (sex: Filter) => {
    setSearchWith(searchParams, {
      sex: sex === 'all' ? null : sex === 'male' ? 'm' : 'f',
    });
  };

  const handleChooseCentury = (century: string) => {
    const newCenturies = centuries.includes(century)
      ? centuries.filter(c => c !== century)
      : [...centuries, century];

    setSearchWith(searchParams, {
      centuries: newCenturies.length ? newCenturies : null,
    });
  };

  const clearCenturies = () => {
    setSearchWith(searchParams, { centuries: null });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={classNames({ 'is-active': filters === 'all' })}
          onClick={() => handleUpdateFilter('all')}
        >
          All
        </a>
        <a
          className={classNames({ 'is-active': filters === 'male' })}
          onClick={() => handleUpdateFilter('male')}
        >
          Male
        </a>
        <a
          className={classNames({ 'is-active': filters === 'female' })}
          onClick={() => handleUpdateFilter('female')}
        >
          Female
        </a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={inputValue}
            onChange={e => handleQueryChange(e)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': !centuries.includes('16'),
              })}
              onClick={() => handleChooseCentury('16')}
            >
              16
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': !centuries.includes('17'),
              })}
              onClick={() => handleChooseCentury('17')}
            >
              17
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': !centuries.includes('18'),
              })}
              onClick={() => handleChooseCentury('18')}
            >
              18
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': !centuries.includes('19'),
              })}
              onClick={() => handleChooseCentury('19')}
            >
              19
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': !centuries.includes('20'),
              })}
              onClick={() => handleChooseCentury('20')}
            >
              20
            </a>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={clearCenturies}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={() => {
            setInputValue('');
            setSearchParams({});
          }}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
