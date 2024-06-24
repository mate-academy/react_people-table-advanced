import cn from 'classnames';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [input, setInput] = useState('');
  const [serchParams, setSerchParams] = useSearchParams();
  const getCenturies = serchParams.getAll('centuries' || null);
  const selectedAge = ['16', '17', '18', '19', '20'];

  function handleFilterInput(event: React.ChangeEvent<HTMLInputElement>) {
    const search = getSearchWith(serchParams, {
      query: event.target.value || null,
    });

    setInput(event.target.value);

    setSerchParams(search);
  }

  function toggleCenturies(centuries: string): string[] {
    return getCenturies.includes(centuries)
      ? getCenturies.filter(century => century !== centuries)
      : [...getCenturies, centuries];
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={serchParams.get('sex') === null ? 'is-active' : ''}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={serchParams.get('sex') === 'm' ? 'is-active' : ''}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={serchParams.get('sex') === 'f' ? 'is-active' : ''}
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
            value={input}
            onChange={handleFilterInput}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {selectedAge.map(century => (
              <SearchLink
                key={century}
                params={{
                  centuries: toggleCenturies(century),
                }}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': getCenturies.includes(century),
                })}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': getCenturies.length !== 0,
              })}
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
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ centuries: null, query: null, sex: null }}
          onClick={() => setInput('')}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
