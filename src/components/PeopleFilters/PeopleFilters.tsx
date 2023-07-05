import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { Centuries } from 'enums/Centuries';
import { Sex } from 'enums/Sex';

import { Filter } from 'types/Filter';
import { getSearchWith } from 'utils/searchHelper';

const listOfCenturies = Object.values(Centuries);

type Props = {
  handleFilter: (value: Filter | string[]) => void;
  handleQuery: (value: string) => void;
};

export const PeopleFilters: React.FC<Props> = ({
  handleFilter,
  handleQuery,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedLink, setSelectedLink] = useState(Sex.All);
  const centuries = searchParams.getAll('centuries');
  const [query, setQuery] = useState('');
  const [centuriesList] = useState(listOfCenturies);

  const handleSelectSex = (
    e: React.MouseEvent<HTMLAnchorElement>,
    value: Filter,
  ) => {
    e.preventDefault();

    setSearchParams(
      getSearchWith(searchParams, {
        sex: value === Sex.All ? null : value,
      }),
    );

    setSelectedLink(value as Sex);
    handleFilter(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const trimmed = e.target.value.trim();

    setQuery(trimmed);

    if (!trimmed) {
      setSearchParams(
        getSearchWith(searchParams, { query: null }),
      );
    } else {
      setSearchParams(
        getSearchWith(searchParams, { query: trimmed }),
      );
    }

    handleQuery(trimmed);
  };

  const handleClickCentury = (century: Centuries) => {
    const isIncluded = centuries.includes(century);
    const arrOfCenturies = isIncluded
      ? centuries.filter((cent) => cent !== century)
      : [...centuries, century];

    setSearchParams(
      getSearchWith(searchParams, {
        centuries: arrOfCenturies,
      }),
    );

    handleFilter(arrOfCenturies);
  };

  const resetFilters = () => {
    setSearchParams(
      getSearchWith(searchParams, {
        query: null,
        sex: null,
        centuries: null,
      }),
    );
  };

  const reset = () => {
    setSelectedLink(Sex.All);
    handleFilter(Sex.All);
    handleQuery('');
    setQuery('');
    resetFilters();
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames({
            'is-active': selectedLink === Sex.All,
          })}
          to="/"
          onClick={(e) => handleSelectSex(e, Sex.All)}
        >
          All
        </Link>

        <Link
          className={classNames({
            'is-active': selectedLink === Sex.M,
          })}
          to="/"
          onClick={(e) => handleSelectSex(e, Sex.M)}
        >
          Male
        </Link>

        <Link
          className={classNames({
            'is-active': selectedLink === Sex.F,
          })}
          to="/"
          onClick={(e) => handleSelectSex(e, Sex.F)}
        >
          Female
        </Link>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={handleChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesList.map((century) => (
              <button
                type="button"
                key={century}
                data-cy="century"
                onClick={() => handleClickCentury(century)}
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
              >
                {century}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <button
              data-cy="centuryALL"
              className="button is-success is-outlined"
              type="button"
              onClick={resetFilters}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          type="button"
          className="button is-link is-outlined is-fullwidth"
          onClick={reset}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
