import classNames from 'classnames';
import React from 'react';

type Props = {
  query: string;
  centuries: string[];
  handleFilterByQuery: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFilterBySex: (value: string | null) => void;
  searchParams: URLSearchParams;
  handleFilterByCenturies: (ch: string) => void;
  handleClearCenturies: () => void;
  handleClearAllFilters: () => void;
};

export const PeopleFilters: React.FC<Props> = ({
  query,
  centuries,
  handleFilterByQuery,
  handleFilterBySex,
  handleFilterByCenturies,
  searchParams,
  handleClearCenturies,
  handleClearAllFilters,
}) => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <button
          onClick={() => handleFilterBySex(null)}
          className={classNames({ 'is-active': !searchParams.get('sex') })}
        >
          All
        </button>
        <button
          onClick={() => handleFilterBySex('m')}
          className={classNames({
            'is-active': searchParams.get('sex') === 'm',
          })}
        >
          Male
        </button>
        <button
          onClick={() => handleFilterBySex('f')}
          className={classNames({
            'is-active': searchParams.get('sex') === 'f',
          })}
        >
          Female
        </button>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={handleFilterByQuery}
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
                onClick={() => handleFilterByCenturies(century.toString())}
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century.toString()),
                })}
              >
                {century}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <button
              data-cy="centuryALL"
              onClick={handleClearCenturies}
              className={classNames('button is-success', {
                'is-outlined': centuries.length,
              })}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          className="button is-link is-outlined is-fullwidth"
          onClick={handleClearAllFilters}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
