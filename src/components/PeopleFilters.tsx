import React, { useEffect, useMemo } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { usePeopleContext } from './PeopleContext/PeopleContext';
import { calculateBirthCenturies } from './function/calculateBirthCenturies';
import { SearchLink } from './SearchLink';
import { Person } from '../types';

export const PeopleFilters = () => {
  const {
    searchByName,
    setSearchByName,
    setFilteredPeople,
    people,
  } = usePeopleContext();

  const [searchParams, setSearchParams] = useSearchParams();
  const century = useMemo(
    () => searchParams.getAll('centuries') || [], [searchParams],
  );
  const centurysNumber = calculateBirthCenturies(people);

  const filterPeopleByCenturies = (
    peopleArray: Person[],
    selectedCenturies: string[],
  ) => {
    return peopleArray.filter(person => {
      const personCentury = Math.ceil(person.born / 100).toString();

      return selectedCenturies.includes(personCentury);
    });
  };

  useEffect(() => {
    const searchParamValue = searchParams.get('query') || '';

    setSearchByName(searchParamValue);

    const filteredByName = people.filter((person) => (
      person.name.toLowerCase()
        .includes(searchParamValue.toLowerCase())
    ));

    const filteredByCentury = century.length === 0
      ? filteredByName
      : filterPeopleByCenturies(filteredByName, century);

    setFilteredPeople(filteredByCentury);
  }, [searchParams, people, setSearchByName, setFilteredPeople, century]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (!value) {
      searchParams.delete('query');
    }

    setSearchByName(value);

    const param = new URLSearchParams(searchParams);

    param.set('query', value);
    setSearchParams(param);
  };

  const handleReset = () => {
    searchParams.delete('centuries', 'query');
  };

  const handleCenturyFilter = (ch: string) => {
    const newCenturies = century.includes(`${ch}`)
      ? century.filter(item => item !== `${ch}`)
      : [...century, ch];

    return newCenturies;
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a className="is-active" href="#/people">All</a>
        <a className="" href="#/people?sex=m">Male</a>
        <a className="" href="#/people?sex=f">Female</a>
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
            <NavLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to="#/people"
            >
              All
            </NavLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
          onClick={handleReset}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
