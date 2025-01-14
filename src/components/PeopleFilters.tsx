import { useSearchParams } from 'react-router-dom';
import React, { ChangeEvent } from 'react';
import { getSearchWith, SearchParams } from '../utils/searchHelper';
import classNames from 'classnames';

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSetParams = (newParams: SearchParams) => {
    const updatedParams = getSearchWith(searchParams, newParams);

    setSearchParams(updatedParams);
  };

  const addCenturyParams = (century: string) => {
    const centuries = searchParams.getAll('century');

    handleSetParams({
      century: centuries.includes(century)
        ? centuries.filter(c => c !== century)
        : [...centuries, century],
    });
  };

  const query = searchParams.get('query') || '';

  const sexFilters = [
    { label: 'All', value: null },
    { label: 'Male', value: 'm' },
    { label: 'Female', value: 'f' },
  ];

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value.length ? e.target.value : null;

    handleSetParams({ query: newQuery });
  };

  const centuries = ['16', '17', '18', '19', '20'];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sexFilters.map(filter => (
          <a
            key={filter.value}
            className={classNames({
              'is-active':
                (!searchParams.get('sex') && filter.value === null) ||
                searchParams.get('sex') === filter.value,
            })}
            onClick={() => handleSetParams({ sex: filter.value })}
          >
            {filter.label}
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
            onChange={handleQueryChange}
          />

          <span className="icon is-left">
            <i
              className="fas fa-search"
              aria-hidden="true"
              onClick={() => {
                handleSetParams({ query: null });
              }}
            />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuries.map(century => (
              <a
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': searchParams.getAll('century')?.includes(century),
                })}
                onClick={() => addCenturyParams(century)}
              >
                {century}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': !!searchParams.getAll('century')?.length,
              })}
              onClick={() =>
                setSearchParams(getSearchWith(searchParams, { century: null }))
              }
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={() =>
            setSearchParams(
              getSearchWith(searchParams, {
                sex: null,
                query: null,
                century: null,
              }),
            )
          }
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
