import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const numbers = [16, 17, 18, 19, 20];
  const sexes = [
    { title: 'All', char: null },
    { title: 'Male', char: 'm' },
    { title: 'Female', char: 'f' },
  ];
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const onChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchParams = getSearchWith(
      searchParams, { query: `${e.currentTarget.value}` || null },
    );

    setSearchParams(newSearchParams);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sexes.map(sexItem => (
          <SearchLink
            key={sexItem.title}
            params={{ sex: sexItem.char }}
            className={sex === sexItem.char ? 'is-active' : ''}
          >
            {sexItem.title}
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
            onChange={onChangeQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {numbers.map(number => (
              <SearchLink
                key={number}
                params={{
                  centuries: centuries.includes(`${number}`)
                    ? centuries.filter(century => century !== `${number}`)
                    : [...centuries, `${number}`],
                }}
                data-cy="century"
                className={classNames('button', 'mr-1', {
                  'is-info': centuries.includes(`${number}`),
                })}
              >
                {number}
              </SearchLink>
            ))}

          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              params={{ centuries: null }}
              className="button is-success is-outlined"
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ sex: null, query: null, centuries: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
