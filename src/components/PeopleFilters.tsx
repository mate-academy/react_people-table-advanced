import React from 'react';
import classNames from 'classnames';
import { useQueryParams } from '../pages/PeoplePage';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const { searchParams, setSearchParams } = useQueryParams();

  const handleNameFilterChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = getSearchWith(searchParams, {
      query: ev.target.value || null,
    });

    setSearchParams(new URLSearchParams(newSearch));
  };

  const handleSexFilter = (sex: string | null) => {
    const newSearch = getSearchWith(searchParams, { sex });

    setSearchParams(new URLSearchParams(newSearch));
  };

  const handleCenturyToggle = (century: number) => {
    const currentCenturies = searchParams.getAll('centuries');
    const updatedCenturies = currentCenturies.includes(String(century))
      ? currentCenturies.filter(c => c !== String(century))
      : [...currentCenturies, String(century)];
    const newSearch = getSearchWith(searchParams, {
      centuries: updatedCenturies.length ? updatedCenturies : null,
    });

    setSearchParams(new URLSearchParams(newSearch));
  };

  const handleResetCenturies = () => {
    const newSearch = getSearchWith(searchParams, { centuries: null });

    setSearchParams(new URLSearchParams(newSearch));
  };

  const handleResetFilters = () => {
    const newSearch = getSearchWith(searchParams, {
      sex: null,
      query: null,
      centuries: null,
    });

    setSearchParams(new URLSearchParams(newSearch));
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>
      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={!searchParams.get('sex') ? 'is-active' : ''}
          onClick={() => handleSexFilter(null)}
        >
          All
        </a>
        <a
          className={searchParams.get('sex') === 'm' ? 'is-active' : ''}
          onClick={() => handleSexFilter('m')}
        >
          Male
        </a>
        <a
          className={searchParams.get('sex') === 'f' ? 'is-active' : ''}
          onClick={() => handleSexFilter('f')}
        >
          Female
        </a>
      </p>
      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            value={searchParams.get('query') || ''}
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            onChange={handleNameFilterChange}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>
      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {[16, 17, 18, 19, 20].map(century => (
              <button
                data-cy="century"
                key={century}
                onClick={() => handleCenturyToggle(century)}
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
              data-cy="centuryALL"
              className={classNames(
                'button',
                {
                  'is-outlined': searchParams.getAll('centuries').length !== 0,
                },
                'is-success',
              )}
              onClick={handleResetCenturies}
            >
              All
            </button>
          </div>
        </div>
      </div>
      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={handleResetFilters}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
