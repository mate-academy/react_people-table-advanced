import classNames from 'classnames';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CenturyButton } from './CenturyButton';

type Props = {
  query: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleSex: (sex: string | null) => void;
  toggleCentuary: (cent: string | null) => void;
  handleReset: () => void;
};

const usePeopleFilters = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const selectedSex = params.get('sex');
  const selectedCenturies = params.getAll('centuries');
  const centuries = [16, 17, 18, 19, 20];

  return { selectedSex, selectedCenturies, centuries };
};

const preventDefaultAndToggle = (
  e: React.MouseEvent<HTMLAnchorElement>,
  toggleFunction: (value: string | null) => void,
  value: string | null,
) => {
  e.preventDefault();
  toggleFunction(value);
};

export const PeopleFilters: React.FC<Props> = ({
  query,
  handleInputChange,
  toggleSex,
  toggleCentuary,
  handleReset,
}) => {
  const { selectedSex, selectedCenturies, centuries } = usePeopleFilters();

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={classNames({ 'is-active': selectedSex === null })}
          href="#/people"
          onClick={e => preventDefaultAndToggle(e, toggleSex, null)}
        >
          All
        </a>
        <a
          className={classNames({ 'is-active': selectedSex === 'm' })}
          href="#/people?sex=m"
          onClick={e => preventDefaultAndToggle(e, toggleSex, 'm')}
        >
          Male
        </a>
        <a
          className={classNames({ 'is-active': selectedSex === 'f' })}
          href="#/people?sex=f"
          onClick={e => preventDefaultAndToggle(e, toggleSex, 'f')}
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
              <CenturyButton
                key={century}
                century={century}
                selectedCenturies={selectedCenturies}
                toggleCentuary={toggleCentuary}
              />
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': selectedCenturies.length,
              })}
              href="#/people"
              onClick={e => preventDefaultAndToggle(e, toggleCentuary, null)}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to="/people"
          onClick={() => {
            handleReset();
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
