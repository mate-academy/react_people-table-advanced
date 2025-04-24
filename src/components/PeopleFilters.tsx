import classNames from 'classnames';
import React from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';

interface Props {
  query: string;
  setSortValue: (value: string) => void;
  setCentury: (value: string) => void;
}

const centuriesList = ['16', '17', '18', '19', '20'];

export const PeopleFilters: React.FC<Props> = ({
  query,
  setSortValue,
  setCentury,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCenturies = searchParams.getAll('centuries');
  const sex = searchParams.get('sex') ?? '';

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    const params = new URLSearchParams(searchParams);

    if (value === '') {
      params.delete('query');
    } else {
      params.set('query', value);
    }

    setSearchParams(params);
  }

  function toggleCentury(century: string) {
    const params = new URLSearchParams(searchParams);
    const current = params.getAll('centuries');

    const updated = current.includes(century)
      ? current.filter(c => c !== century)
      : [...current, century];

    setCentury(century);

    params.delete('centuries');
    updated.forEach(c => params.append('centuries', c));

    setSearchParams(params);
  }

  function resetFilters() {
    setSearchParams(new URLSearchParams());
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {[
          { label: 'All', value: '', sort: 'All' },
          { label: 'Male', value: 'm', sort: 'Male' },
          { label: 'Female', value: 'f', sort: 'Female' },
        ].map(({ label, value, sort }) => {
          const params = new URLSearchParams(searchParams);

          if (value === '') {
            params.delete('sex');
          } else {
            params.set('sex', value);
          }

          return (
            <NavLink
              key={label}
              to={{
                pathname: '/people',
                search: params.toString(),
              }}
              className={() =>
                classNames('', {
                  'is-active': sex === value,
                })
              }
              end
              onClick={() => setSortValue(sort)}
            >
              {label}
            </NavLink>
          );
        })}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
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
            {centuriesList.map(century => (
              <button
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': selectedCenturies.includes(century),
                })}
                onClick={() => toggleCentury(century)}
              >
                {century}
              </button>
            ))}
          </div>
          <div className="level-right ml-4">
            <button
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={() => {
                const params = new URLSearchParams(searchParams);

                params.delete('centuries');
                setSearchParams(params);
              }}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          className="button is-link is-outlined is-fullwidth"
          onClick={resetFilters}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
