import classNames from 'classnames';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

const centuriesForButtons = [
  { century: '16', id: 1 },
  { century: '17', id: 2 },
  { century: '18', id: 3 },
  { century: '19', id: 4 },
  { century: '20', id: 5 },
];

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParrams] = useSearchParams();

  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex') || '';

  const handleSearchQuerry = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      searchParams.delete('query');
    } else {
      searchParams.set('query', event.target.value);
    }

    setSearchParrams(searchParams);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={classNames({ 'is-active': sex === '' })}
          href="#/people"
        >
          All
        </a>
        <SearchLink
          className={classNames({ 'is-active': sex === 'm' })}
          params={{
            sex: 'm',
          }}
        >
          Male
        </SearchLink>

        <SearchLink
          className={classNames({ 'is-active': sex === 'f' })}
          params={{
            sex: 'f',
          }}
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
            value={searchParams.get('query') || ''}
            onChange={(event) => handleSearchQuerry(event)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesForButtons.map(({ century, id }) => (
              <SearchLink
                key={id}
                data-cy="century"
                className={classNames(
                  'button mr-1',
                  { 'is-info': centuries.includes(`${century}`) },
                )}
                params={{
                  centuries: centuries.includes(century)
                    ? centuries.filter(cent => cent !== century)
                    : [...centuries, century],
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames(
                'button is-success',
                { 'is-outlined': centuries.length > 0 },
              )}
              params={{
                centuries: null,
              }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
