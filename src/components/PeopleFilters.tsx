import React, { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';

import cn from 'classnames';
import { SearchParams, getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
  onFilter: (fp: Person[]) => void;
};

const centuriesList = ['16', '17', '18', '19', '20'];

const getFilteredBySex = (people: Person[], sex: string) => {
  return sex ? people.filter(person => person.sex === sex) : people;
};

const getFilteredByQuery = (people: Person[], query: string) => {
  const prepearedQuery = query.trim().toLowerCase();

  if (!query) {
    return people;
  }

  return people.filter(person =>
    person.name.toLocaleLowerCase().includes(prepearedQuery),
  );
};

const getFilteredByCentury = (people: Person[], centuries: string[]) => {
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

  const filteredBySex = useMemo(
    () => getFilteredBySex(people, sex),
    [people, sex],
  );
  const filteredByQuery = useMemo(
    () => getFilteredByQuery(filteredBySex, query),
    [filteredBySex, query],
  );
  const filteredByCentury = useMemo(
    () => getFilteredByCentury(filteredByQuery, centuries),
    [filteredByQuery, centuries],
  );

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchWith({ query: event.target.value || null });
  }

  function toggleCenturis(ch: string) {
    const newCenturies = centuries.includes(ch)
      ? centuries.filter(century => century !== ch)
      : [...centuries, ch];

    setSearchWith({ centuries: newCenturies });
  }

  function clearCenturies() {
    setSearchWith({ centuries: null });
  }

  useEffect(() => {
    onFilter(filteredByCentury);
  }, [filteredByCentury, onFilter]);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={cn({
            'is-active': !sex,
          })}
          params={{}}
        >
          All
        </SearchLink>
        <SearchLink
          className={cn({
            'is-active': sex === 'm',
          })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={cn({
            'is-active': sex === 'f',
          })}
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
            {centuriesList.map(century => (
              <button
                data-cy="century"
                key={century}
                onClick={() => toggleCenturis(century)}
                className={cn('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                onChange={() => onFilter(filteredByCentury)}
              >
                {century}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <button
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuries.length,
              })}
              onClick={() => clearCenturies()}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ centuries: null, query: null, sex: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
