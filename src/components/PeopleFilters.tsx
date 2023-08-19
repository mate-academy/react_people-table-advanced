/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { useContext } from 'react';
import { getSearchWith } from '../utils/searchHelper';
import { SEX } from '../types/SexEnum';
import { SearchLink } from './SearchLink';
import { PeopleContext } from '../context/PeopleContext';

const genderValues = [
  { title: SEX.ALL, value: null },
  { title: SEX.FEMALE, value: 'f' },
  { title: SEX.MALE, value: 'm' },
];

const centuriesButtons = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { sex, centuries } = useContext(PeopleContext);

  const setSearchWith = (params: any) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const normalizeCenturies = (currentCentury: string) => {
    const normalizeCentury = centuries.includes(currentCentury)
      ? centuries.filter((century) => century !== currentCentury)
      : [...centuries, currentCentury];

    return normalizeCentury;
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {genderValues.map((gender) => (
          <SearchLink
            key={gender.title}
            className={classNames({ 'is-active': sex === gender.value })}
            params={{ sex: gender.value }}
          >
            {gender.title}
          </SearchLink>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            onChange={(event) => setSearchWith({ query: event.target.value || null })}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesButtons.map((century) => (
              <SearchLink
                data-cy="century"
                className={classNames({
                  'button mr-1': true,
                  'is-info': centuries.includes(century),
                })}
                params={{ centuries: normalizeCenturies(century) }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link to="/people" className="button is-link is-outlined is-fullwidth">
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
