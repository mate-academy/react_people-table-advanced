import classNames from 'classnames';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

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

  function handleSexFilterChange(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const sex = event.currentTarget.href.split('=')[1] || '';

    const params = new URLSearchParams(searchParams);

    params.set('sex', sex);

    if (!sex) {
      params.delete('sex');
    }

    setSearchParams(params);
  }

  function handleCenturyFilterChange(
    event: React.MouseEvent<HTMLAnchorElement>,
  ) {
    event.preventDefault();
    const century = event.currentTarget.href.split('=')[1];

    const params = new URLSearchParams(searchParams);

    const newCenturies = centuries.includes(century)
      ? centuries.filter(c => c !== century)
      : [...centuries, century];

    params.delete('centuries');
    newCenturies.forEach(c => params.append('centuries', c));

    setSearchParams(params);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(sexList).map(([name, value]) => (
          <a
            key={name}
            className={
              value === (searchParams.get('sex') || '') ? 'is-active' : ''
            }
            href={`#/people?sex=${value}`}
            onClick={handleSexFilterChange}
          >
            {name}
          </a>
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
                <a
                  key={century}
                  data-cy="century"
                  className={classNames('button mr-1', {
                    'is-info': centuries.includes(century),
                  })}
                  href={`#/people?centuries=${century}`}
                  onClick={handleCenturyFilterChange}
                >
                  {century}
                </a>
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
