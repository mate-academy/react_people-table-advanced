import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';
import { useState } from 'react';

const sexFilterLinks = [
  { id: 1, title: 'All', sex: null },
  { id: 2, title: 'Male', sex: 'm' },
  { id: 3, title: 'Female', sex: 'f' },
];

const centuriesFilterLinks = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const [query, setQuery] = useState(searchParams.get('query') || '');

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sexFilterLinks.map(link => (
          <SearchLink
            key={link.id}
            params={{ sex: link.sex }}
            className={classNames({ 'is-active': sex === link.sex })}
          >
            {link.title}
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
            onChange={e => {
              const value = e.target.value;

              if (value === '') {
                searchParams.delete('query');
              } else {
                searchParams.set('query', value);
              }

              setQuery(value);
              setSearchParams(searchParams);
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
            {centuriesFilterLinks.map(link => (
              <SearchLink
                key={link}
                params={{
                  centuries: centuries.includes(link)
                    ? centuries.filter(c => c !== link)
                    : [...centuries, link],
                }}
                data-cy="century"
                className={classNames('button', 'mr-1', {
                  'is-info': centuries.includes(link),
                })}
              >
                {link}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button', 'is-success', {
                'is-outlined': centuries.length > 0,
              })}
              params={{ centuries: [] }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-fullwidth is-outlined"
          params={{
            centuries: [],
            sex: null,
            query: null,
          }}
          onClick={() => setQuery('')}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
