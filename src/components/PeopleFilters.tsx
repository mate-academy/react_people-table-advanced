import React from 'react';
import { PeopleFilterProps } from '../types/peoplefilter';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

export const PeopleFilters: React.FC<PeopleFilterProps> = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSex = searchParams.get('sex');
  const currentCenturies = searchParams.getAll('centuries'); // [1, 2, 3]
  const currentQuery = searchParams.get('query') || '';

  const getList = (field: string) => {
    if (currentCenturies.includes(field)) {
      return [...currentCenturies].filter(f => f !== field);
    }

    return [...currentCenturies, field];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({
            'is-active': currentSex !== 'm' && currentSex !== 'f',
          })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': currentSex === 'm' })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': currentSex === 'f' })}
          params={{ sex: 'f' }}
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
            value={currentQuery}
            onChange={event => {
              setSearchParams({ query: event.target.value });
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
            <SearchLink
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': currentCenturies.includes('16'),
              })}
              params={{
                centuries: getList('16'),
              }}
            >
              16
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': currentCenturies.includes('17'),
              })}
              params={{ centuries: getList('17') }}
            >
              17
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': currentCenturies.includes('18'),
              })}
              params={{ centuries: getList('18') }}
            >
              18
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': currentCenturies.includes('19'),
              })}
              params={{ centuries: getList('19') }}
            >
              19
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': currentCenturies.includes('20'),
              })}
              params={{ centuries: getList('20') }}
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-outlined is-success"
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={'/people'}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
