import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

const CENTURIES = [16, 17, 18, 19, 20];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allCenturiesSelected, setAllCenturiesSelected] = useState(true);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;

    if (query) {
      searchParams.set('query', query);
    } else {
      searchParams.delete('query');
    }

    setSearchParams(searchParams);
  };

  const handleCenturyChange = (century: number) => {
    const centuries = searchParams.getAll('centuries');
    const newCenturies = new Set(centuries);

    if (newCenturies.has(String(century))) {
      newCenturies.delete(String(century));
    } else {
      newCenturies.add(String(century));
    }

    searchParams.delete('centuries');
    newCenturies.forEach(c => searchParams.append('centuries', c));

    setSearchParams(searchParams);
  };

  useEffect(() => {
    const selectedCenturies = searchParams.getAll('centuries');

    setAllCenturiesSelected(
      selectedCenturies.length === 0 ||
        selectedCenturies.length === CENTURIES.length,
    );
  }, [searchParams]);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({ 'is-active': !searchParams.get('sex') })}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={classNames({
            'is-active': searchParams.get('sex') === 'm',
          })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={classNames({
            'is-active': searchParams.get('sex') === 'f',
          })}
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
            {CENTURIES.map(century => (
              <button
                key={century}
                onClick={() => handleCenturyChange(century)}
                className={classNames('button', 'mr-1', {
                  'is-info': searchParams
                    .getAll('centuries')
                    .includes(String(century)),
                })}
              >
                {century}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <button
              onClick={() => {
                searchParams.delete('centuries');
                setSearchParams(searchParams);
              }}
              className={classNames('button', 'is-success', {
                'is-outlined': !allCenturiesSelected,
              })}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{ sex: null, centuries: null, query: null }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
