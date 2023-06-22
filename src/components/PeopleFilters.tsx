import React, { useMemo } from 'react';
import classNames from 'classnames';

type Props = {
  query: string | null,
  sex: string | null,
  centuries: number[],
  updateSearch(params: {
    [key: string]: number[] | string | null
  }):void,
};

export const PeopleFilters: React.FC<Props> = ({
  query,
  sex,
  centuries,
  updateSearch,
}) => {
  const setFilter = (value: string | null) => {
    return (event: React.SyntheticEvent) => {
      event.preventDefault();
      updateSearch({ sex: value });
    };
  };

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateSearch({ query: event.target.value });
  };

  const resetCenturies = (event: React.SyntheticEvent) => {
    event.preventDefault();
    updateSearch({ centuries: null });
  };

  const resetFilters = (event: React.SyntheticEvent) => {
    event.preventDefault();
    updateSearch({ sex: null });
    updateSearch({ query: null });
    updateSearch({ centuries: null });
  };

  useMemo((() => {
    if (sex === null) {
      setFilter(null);
    }

    if (sex === 'm') {
      setFilter('m');
    }

    if (sex === 'f') {
      setFilter('f');
    }
  }), [sex]);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p
        className="panel-tabs button_container"
        data-cy="SexFilter"
      >
        <button
          className="button__filter"
          type="button"
          onClick={setFilter(null)}
        >
          <a
            className={classNames({ 'is-active': sex === null })}
            href="/"
          >
            All
          </a>
        </button>
        <button
          className="button__filter"
          type="button"
          onClick={setFilter('m')}
        >
          <a
            className={classNames({ 'is-active': sex === 'm' })}
            href="/"
          >
            Male
          </a>
        </button>
        <button
          className="button__filter"
          type="button"
          onClick={setFilter('f')}
        >
          <a
            className={classNames({ 'is-active': sex === 'f' })}
            href="/"
          >
            Female
          </a>
        </button>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query !== null
              ? query
              : ''}
            onChange={onQueryChange}
          />

          <span className="icon is-left">
            <i
              className="fas fa-search"
              aria-hidden="true"
            />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {[16, 17, 18, 19, 20].map(century => (
              <button
                className="button__filter"
                type="button"
                onClick={() => {
                  updateSearch({
                    centuries: centuries.includes(century)
                      ? centuries.filter(c => c !== century)
                      : [...centuries, century],
                  });
                }}
              >
                <div
                  data-cy="century"
                  key={String(century)}
                  className={classNames(
                    'button mr-1', { 'is-info': centuries.includes(century) },
                  )}
                >
                  {century}
                </div>
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <button
              type="button"
              className="button__reset"
              onClick={resetCenturies}
            >
              <div
                data-cy="centuryALL"
                className={classNames(
                  'button is-success', { 'is-outlined': centuries.length > 0 },
                )}
              >
                All
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          className="button__reset"
          type="button"
          onClick={resetFilters}
        >
          <div
            className="button is-link is-outlined is-fullwidth"
          >
            Reset all filters
          </div>
        </button>
      </div>
    </nav>
  );
};
