import classNames from 'classnames';
import React from 'react';
import { useLocation } from 'react-router-dom';

type Props = {
  query: string,
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  toggleSex: (sex: string | null) => void,
  toggleCentury: (cent: string | null) => void,
  handleReset: () => void,
};

export const PeopleFilters: React.FC<Props> = ({
  query,
  handleInputChange,
  toggleSex,
  toggleCentury,
  handleReset,
}) => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const selectedSex = params.get('sex');
  const selectedCenturies = params.getAll('centuries');

  const centuries = [16, 17, 18, 19, 20];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={classNames({ 'is-active': selectedSex === null })}
          href="#/people"
          onClick={(e) => {
            e.preventDefault();
            toggleSex(null);
          }}
        >
          All
        </a>

        <a
          className={classNames({ 'is-active': selectedSex === 'm' })}
          href="#/people?sex=m"
          onClick={(e) => {
            e.preventDefault();
            toggleSex('m');
          }}
        >
          Male
        </a>

        <a
          className={classNames({ 'is-active': selectedSex === 'f' })}
          href="#/people?sex=f"
          onClick={(e) => {
            e.preventDefault();
            toggleSex('f');
          }}
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
            onChange={handleInputChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
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
                className={classNames(
                  'button mr-1',
                  { 'is-info': selectedCenturies.includes(`${century}`) },
                )}
                href={`#/people?centuries=${century}`}
                onClick={(e) => {
                  e.preventDefault();
                  toggleCentury(`${century}`);
                }}
              >
                {century}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={classNames(
                'button is-success',
                { 'is-outlined': selectedCenturies.length },
              )}
              href="#/people"
              onClick={(e) => {
                e.preventDefault();
                toggleCentury(null);
              }}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
          onClick={(e) => {
            e.preventDefault();
            handleReset();
          }}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
