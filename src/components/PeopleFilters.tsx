import cn from 'classnames';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Centuries } from '../utils/constants';

type Props = {
  query: string;
  handleQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleToggleSex: (sex: string | null) => void;
  handleToggleCenturies: (century: string | null) => void;
  handleResetAllFilters: () => void;
};

export const PeopleFilters: React.FC<Props> = ({
  query,
  handleQueryChange,
  handleToggleSex,
  handleToggleCenturies,
  handleResetAllFilters,
}) => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const selectedSex = params.get('sex');
  const selectedCenturies = params.getAll('centuries');

  const centuries = Centuries;

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={cn({ 'is-active': selectedSex === null })}
          href="#/people"
          onClick={(e) => {
            e.preventDefault();
            handleToggleSex(null);
          }}
        >
          All
        </a>
        <a
          className={cn({ 'is-active': selectedSex === 'm' })}
          href="#/people?sex=m"
          onClick={(e) => {
            e.preventDefault();
            handleToggleSex('m');
          }}
        >
          Male
        </a>
        <a
          className={cn({ 'is-active': selectedSex === 'f' })}
          href="#/people?sex=f"
          onClick={(e) => {
            e.preventDefault();
            handleToggleSex('f');
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

            {centuries.map(century => (
              <a
                key={century}
                data-cy="century"
                className={cn(
                  'button mr-1',
                  { 'is-info': selectedCenturies.includes(`${century}`) },
                )}
                href={`#/people?centuries=${century}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleToggleCenturies(`${century}`);
                }}
              >
                {century}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={cn(
                'button is-success',
                { 'is-outlined': selectedCenturies.length },
              )}
              href="#/people"
              onClick={(e) => {
                e.preventDefault();
                handleToggleCenturies(null);
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
            handleResetAllFilters();
          }}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
