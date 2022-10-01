import classNames from 'classnames';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';
import { SearchLink } from '../SearchLink/SearchLink';

const centuriesList = ['16', '17', '18', '19', '20'];

type Props = {
  sex: string;
  query: string;
  centuries: string[];
};

export const PeopleFilter: React.FC<Props> = (
  {
    sex,
    query,
    centuries,
  },
) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { query: event.target.value || null }),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames(
            {
              'is-active': !sex,
            },
          )}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames(
            {
              'is-active': sex === 'm',
            },
          )}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames(
            {
              'is-active': sex === 'f',
            },
          )}
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
            value={query}
            onChange={onQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesList.map(number => (
              <SearchLink
                params={{
                  centuries: centuries.includes(number)
                    ? centuries.filter(century => century !== number)
                    : [...centuries, number],
                }}
                data-cy="century"
                className={classNames(
                  'button mr-1',
                  {
                    'is-info': centuries.includes(number),
                  },
                )}
                key={number}
              >
                {number}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames(
                'button',
                {
                  'is-success': centuries.length === 0,
                  'is-success is-outlined': centuries.length > 0,
                },
              )}
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
          params={{
            centuries: null,
            sex: null,
            query: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
