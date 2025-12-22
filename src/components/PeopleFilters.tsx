import classNames from 'classnames';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

const sexList: { [key: string]: string } = {
  All: '',
  Male: 'm',
  Female: 'f',
};
const centuryList: string[] = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newQuery = event.target.value;

    const params = new URLSearchParams(searchParams);

    params.set('query', newQuery);

    if (!newQuery) {
      params.delete('query');
    }

    setSearchParams(params);
  }

  function processArrayParams(current: string[], newElement: string) {
    return current.includes(newElement)
      ? current.filter(c => c !== newElement)
      : [...current, newElement];
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(sexList).map(([name, value]) => (
          <SearchLink
            key={name}
            className={
              value === (searchParams.get('sex') || '') ? 'is-active' : ''
            }
            params={{ sex: value }}
          >
            {name}
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
            onChange={handleSearchChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <div className="level-right ml-4">
              {centuryList.map(century => (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={classNames('button mr-1', {
                    'is-info': centuries.includes(century),
                  })}
                  params={{ centuries: processArrayParams(centuries, century) }}
                >
                  {century}
                </SearchLink>
              ))}
            </div>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href="#/people"
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a className="button is-link is-outlined is-fullwidth" href="#/people">
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
