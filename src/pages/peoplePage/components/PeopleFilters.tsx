import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');

  const centuries = ['16', '17', '18', '19', '20'];

  const currentSex = searchParams.get('sex');
  const century = searchParams.getAll('centuries');

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);

    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value);

    setSearchParams(params);
  };

  const toggleCentury = (number: string) => {
    const currentCenturies = searchParams.getAll('centuries');

    let updatedCenturies: string[];

    if (currentCenturies.includes(number)) {
      updatedCenturies = currentCenturies.filter(c => c !== number);
    } else {
      updatedCenturies = [...currentCenturies, number];
    }

    return updatedCenturies;
  };

  const clearCentury = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    setSearchParams(params);
  };

  const resetFilters = () => {
    const newParams = new URLSearchParams(searchParams);

    newParams.delete('query');
    newParams.delete('sex');
    newParams.delete('centuries');

    setSearchParams(newParams);
    setQuery('');
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({ 'is-active': !currentSex })}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={classNames({ 'is-active': currentSex === 'm' })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={classNames({ 'is-active': currentSex === 'f' })}
        >
          {' '}
          Female{' '}
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
            onChange={handleChangeQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuries.map(oneCentury => {
              const updatedCenturies = toggleCentury(oneCentury);

              return (
                <SearchLink
                  key={oneCentury}
                  params={{ centuries: updatedCenturies }}
                  data-cy="century"
                  className={classNames('button mr-1 ', {
                    'is-info': century.includes(oneCentury),
                  })}
                >
                  {oneCentury}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: [] }}
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={() => clearCentury}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          className="button is-link is-outlined is-fullwidth"
          onClick={() => {
            resetFilters();
          }}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
