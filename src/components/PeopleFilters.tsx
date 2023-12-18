/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/button-has-type */
import classNames from 'classnames';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

enum Sex { Male = 'm', Female = 'f' }

const CENTURIES = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const [sex, setSex] = useState<Sex | null>(searchParams.get('sex') as Sex);
  const [queryField, setQueryField] = useState(query);

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQueryField(event.target.value);

    const params = new URLSearchParams(searchParams);
    const searchQuery = event.target.value
      .toLowerCase()
      .split(' ')
      .filter(word => word)
      .join(' ');

    searchQuery
      ? params.set('query', searchQuery)
      : params.delete('query');

    setSearchParams(params);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': sex === null })}
          params={{ sex: null }}
          onClick={() => setSex(null)}
        >
          All
        </SearchLink>

        <SearchLink
          className={classNames({ 'is-active': sex === Sex.Male })}
          params={{ sex: Sex.Male }}
          onClick={() => setSex(Sex.Male)}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex === Sex.Female })}
          params={{ sex: Sex.Female }}
          onClick={() => setSex(Sex.Female)}
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
            value={queryField}
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
            {CENTURIES.map(item => (
              <SearchLink
                data-cy="century"
                key={item}
                params={{
                  centuries: centuries.includes(item)
                    ? centuries.filter(c => c !== item)
                    : [...centuries, item],
                }}
                className={classNames(
                  'button',
                  'mr-1',
                  { 'is-info': centuries.includes(item) },
                )}
              >
                {item}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames(
                'button',
                'is-success',
                { 'is-outlined': !centuries.length },
              )}
              params={{ centuries: null, sex: null, query: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className={classNames(
            'button',
            'is-link',
            'is-fullwidth',
            { 'is-outlined': centuries.length || sex || query },
          )}
          params={{ centuries: null, sex: null, query: null }}
          onClick={() => {
            setQueryField('');
            setSex(null);
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
