import classNames from 'classnames';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const arrayOfFilters = ['16', '17', '18', '19', '20'];
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const selectedSex = searchParams.get('sex');

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    const newParam = new URLSearchParams(searchParams.toString());

    if (value) {
      newParam.set('query', value);
    } else {
      newParam.delete('query');
    }

    setSearchParams(newParam);
  };

  const toggleCentury = (century: string) => {
    const newParam = new URLSearchParams(searchParams.toString());
    const allCenturies = newParam.getAll('centuries');
    const stringCentury = century.toString();

    if (allCenturies.includes(stringCentury)) {
      const filtered = allCenturies.filter(c => c !== stringCentury);

      newParam.delete('centuries');
      filtered.forEach(c => newParam.append('centuries', c));
    } else {
      newParam.append('centuries', stringCentury);
    }

    setSearchParams(newParam);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({ 'is-active': !selectedSex })}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={classNames({ 'is-active': selectedSex === 'm' })}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: 'f' }}
          className={classNames({ 'is-active': selectedSex === 'f' })}
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
            onChange={handleName}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {arrayOfFilters.map(age => (
              <button
                key={age}
                type="button"
                onClick={() => toggleCentury(age)}
                className={classNames('button', 'mr-1', {
                  'is-info': centuries.includes(String(age)),
                })}
              >
                {age}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <button
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={() => {
                const newParams = new URLSearchParams(searchParams.toString());

                newParams.delete('centuries');
                setSearchParams(newParams);
              }}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{
            query: null,
            sex: null,
            centuries: [],
            sort: null,
            order: null,
          }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
