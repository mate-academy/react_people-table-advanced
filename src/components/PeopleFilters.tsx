import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { usePeopleContext } from './PeopleContext/PeopleContext';
import { calculateBirthCenturies } from './function/calculateBirthCenturies';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const {
    searchByName,
    setSearchByName,
    people,
  } = usePeopleContext();

  const [searchParams, setSearchParams] = useSearchParams();
  const century = useMemo(
    () => searchParams.getAll('centuries') || [], [searchParams],
  );

  const sexSearch = useMemo(
    () => searchParams.get('sex'), [searchParams],
  );

  const centurysNumber = calculateBirthCenturies(people);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setSearchByName(value);

    const param = new URLSearchParams(searchParams);

    param.set('query', value);
    setSearchParams(param);

    if (!value) {
      searchParams.delete('query');
    }
  };

  const handleCenturyFilter = (ch: string | null) => {
    if (!ch) {
      return null;
    }

    const newCenturies = century.includes(`${ch}`)
      ? century.filter(item => item !== `${ch}`)
      : [...century, ch];

    return newCenturies;
  };

  const handleSexFilter = (fm: string | null) => {
    if (!fm) {
      return null;
    }

    return fm === 'm' ? 'm' : 'f';
  };

  const handleReset = () => {
    setSearchByName('');
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{
            sex: handleSexFilter(null),
          }}
          className={
            classNames(
              {
                'is-active': !(sexSearch === 'm' || sexSearch === 'f'),
              },
            )
          }
        >
          All
        </SearchLink>
        <SearchLink
          params={{
            sex: handleSexFilter('m'),
          }}
          className={
            classNames(
              { 'is-active': sexSearch === 'm' },
            )
          }
        >
          Male
        </SearchLink>

        <SearchLink
          params={{
            sex: handleSexFilter('f'),
          }}
          className={
            classNames(
              { 'is-active': sexSearch === 'f' },
            )
          }
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            value={searchByName}
            onChange={handleInputChange}
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centurysNumber.map((centuryShow) => (
              <SearchLink
                key={centuryShow}
                data-cy="century"
                params={{
                  centuries: handleCenturyFilter(`${centuryShow}`),
                }}
                className={
                  classNames(
                    'button mr-1',
                    { 'is-info': century.includes(`${centuryShow}`) },
                  )
                }
              >
                {centuryShow}
              </SearchLink>
            ))}

          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={
                classNames(
                  'button is-outlined',
                  { 'is-success': !century.length },
                )
              }
              params={{
                centuries: handleCenturyFilter(null),
              }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{
            centuries: null,
            sex: null,
            query: null,
          }}
          onClick={handleReset}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
