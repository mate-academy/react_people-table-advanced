import classNames from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Gender } from '../types/SortSex';
import { SearchLink } from './SearchLink';

type Props = {
  centuries: string[];
  query: string;
  sex: Gender;
  onQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const centuriesData = ['16', '17', '18', '19', '20'];

export const PeopleFilters:FC<Props> = ({
  centuries, query, onQueryChange, sex,
}) => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': sex === Gender.All })}
          params={{ sex: Gender.All }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex === Gender.Male })}
          params={{ sex: Gender.Male }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex === Gender.Female })}
          params={{ sex: Gender.Female }}
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
            value={query}
            onChange={onQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesData.map(century => (
              <SearchLink
                params={{
                  centuries: centuries.includes(century)
                    ? centuries.filter(c => c !== century)
                    : [...centuries, century],
                }}
                key={century}
                data-cy="century"
                className={classNames('button mr-1',
                  { 'is-info': centuries.includes(century) })}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              className="button is-success is-outlined"
              data-cy="centuryALL"
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to="/people"
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
