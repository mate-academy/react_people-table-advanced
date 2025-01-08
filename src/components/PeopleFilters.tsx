import { useSearchParams } from 'react-router-dom';
import React from 'react';
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

    if (centuries.includes(century)) {
      handleSetParams({ century: centuries.filter(c => c !== century) });
    } else {
      handleSetParams({ century: [...centuries, century] });
    }
  };

  const query = searchParams.get('query') || '';

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={classNames({
            'is-active': !searchParams.toString().includes('sex'),
          })}
          onClick={() => handleSetParams({ sex: null })}
        >
          All
        </a>
        <a
          className={classNames({
            'is-active': searchParams.get('sex')?.includes('m'),
          })}
          onClick={() => handleSetParams({ sex: 'm' })}
        >
          Male
        </a>
        <a
          className={classNames({
            'is-active': searchParams.get('sex')?.includes('f'),
          })}
          onClick={() => handleSetParams({ sex: 'f' })}
        >
          Female
        </a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={e => {
              if (!e.target.value.length) {
                handleSetParams({ query: null });
              } else {
                handleSetParams({ query: e.target.value });
              }
            }}
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
            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': searchParams.getAll('century')?.includes('16'),
              })}
              onClick={() => addCenturyParams('16')}
            >
              16
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': searchParams.getAll('century')?.includes('17'),
              })}
              onClick={() => addCenturyParams('17')}
            >
              17
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': searchParams.getAll('century')?.includes('18'),
              })}
              onClick={() => addCenturyParams('18')}
            >
              18
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': searchParams.getAll('century')?.includes('19'),
              })}
              onClick={() => addCenturyParams('19')}
            >
              19
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': searchParams.getAll('century')?.includes('20'),
              })}
              onClick={() => addCenturyParams('20')}
            >
              20
            </a>
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
