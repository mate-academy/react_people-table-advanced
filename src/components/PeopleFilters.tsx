import React, { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { SearchLink } from './SearchLink';
import cn from 'classnames';
import { SearchParams, getSearchWith } from '../utils/searchHelper';

type Props = {
  people: Person[];
  onFilter: (filteredPoeple: Person[]) => void;
};

const centuriesArr = ['16', '17', '18', '19', '20'];

const filterBySex = (people: Person[], sex: string) => {
  return sex ? people.filter(person => person.sex === sex) : people;
};

const filterByQuery = (people: Person[], query: string) => {
  const normalizedQuery = query.trim().toLowerCase();

  if (!query) {
    return people;
  }

  return people.filter(person =>
    person.name.toLowerCase().includes(normalizedQuery),
  );
};

const filterByCenuries = (people: Person[], centuries: string[]) => {
  if (!centuries.length) {
    return people;
  }

  return people.filter(person =>
    centuries.some(century => Math.ceil(person.born / 100) === +century),
  );
};

export const PeopleFilters: React.FC<Props> = ({ people, onFilter }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = useMemo(
    () => searchParams.getAll('centuries') || [],
    [searchParams],
  );

  const filteredPopleBySex = useMemo(
    () => filterBySex(people, sex),
    [people, sex],
  );

  const filteredPeopleByQuery = useMemo(
    () => filterByQuery(filteredPopleBySex, query),
    [filteredPopleBySex, query],
  );

  const filteredPeopleByCenturies = useMemo(
    () => filterByCenuries(filteredPeopleByQuery, centuries),
    [filteredPeopleByQuery, centuries],
  );

  function searchWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    searchWith({ query: event.target.value || null });
  };

  const toggleCentury = (ch: string) => {
    const newCenturies = centuries.includes(ch)
      ? centuries.filter(century => century !== ch)
      : [...centuries, ch];

    searchWith({ centuries: newCenturies });
  };

  const clearCenturies = () => {
    searchWith({ centuries: null });
  };

  useEffect(
    () => onFilter(filteredPeopleByCenturies),
    [onFilter, filteredPeopleByCenturies],
  );

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={cn({ 'is-active': !sex })}
          params={{ sex: null }}
        >
          All
        </SearchLink>

        <SearchLink
          className={cn({ 'is-active': sex === 'm' })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>

        <SearchLink
          className={cn({ 'is-active': sex === 'f' })}
          params={{ sex: 'f' }}
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
            {centuriesArr.map(centurie => (
              <button
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuries.includes(centurie),
                })}
                key={centurie}
                onClick={() => toggleCentury(centurie)}
              >
                {centurie}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <button
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={clearCenturies}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ sex: null, query: null, centuries: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
