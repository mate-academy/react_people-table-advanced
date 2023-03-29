import cn from 'classnames';
import React, { useEffect } from 'react';
import { Person } from '../types';

type Props = {
  peopleFromServer: Person[],
  setFilteredPeople: (people: Person[]) => void,
  searchParams: URLSearchParams,
  setSearchParams: (params: URLSearchParams) => void,
};

export const PeopleFilters: React.FC<Props> = ({
  peopleFromServer,
  setFilteredPeople,
  searchParams,
  setSearchParams,
}) => {
  const centuriesToFilter = ['16', '17', '18', '19', '20'];

  const centuryParams = searchParams.getAll('centuries');
  const sexParam = searchParams.get('sex');
  const queryParam = searchParams.get('query');

  useEffect(() => {
    let people = peopleFromServer;

    if (sexParam) {
      people = people.filter(
        person => person.sex === sexParam,
      );
    }

    if (queryParam) {
      const search = queryParam.toLowerCase().trim();

      people = people.filter(
        person => person.name.toLowerCase().includes(search)
          || person.fatherName?.toLowerCase().includes(search)
          || person.motherName?.toLowerCase().includes(search),
      );
    }

    if (centuryParams.length) {
      people = people.filter(
        person => {
          const bornCentury = Math.floor(person.born / 100) + 1;

          return (centuryParams.includes(bornCentury.toString()));
        },
      );
    }

    setFilteredPeople(people);
  }, [centuryParams, sexParam, queryParam]);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <button
          type="button"
          className={cn(
            { 'is-active': !sexParam },
          )}
          onClick={() => {
            searchParams.delete('sex');
            setSearchParams(searchParams);
          }}
        >
          All
        </button>
        <button
          type="button"
          className={cn(
            { 'is-active': sexParam === 'm' },
          )}
          onClick={() => {
            searchParams.set('sex', 'm');
            setSearchParams(searchParams);
          }}
        >
          Male
        </button>
        <button
          type="button"
          className={cn(
            { 'is-active': sexParam === 'f' },
          )}
          onClick={() => {
            searchParams.set('sex', 'f');
            setSearchParams(searchParams);
          }}
        >
          Female
        </button>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={queryParam || ''}
            onChange={event => {
              searchParams.set('query', event.target.value);
              setSearchParams(searchParams);
            }}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesToFilter.map(century => (
              <button
                key={century}
                data-cy="century"
                className={cn(
                  'button mr-1',
                  { 'is-info': centuryParams.includes(century) },
                )}
                type="button"
                onClick={() => {
                  if (!centuryParams.includes(century)) {
                    searchParams.append('centuries', century);
                    setSearchParams(searchParams);
                  } else {
                    searchParams.delete('centuries');
                    setSearchParams(searchParams);
                    centuryParams.filter(c => c !== century).forEach(c => {
                      searchParams.append('centuries', c);
                      setSearchParams(searchParams);
                    });
                  }
                }}
              >
                {century}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <button
              type="button"
              data-cy="centuryALL"
              className={cn(
                'button is-success',
                { 'is-outlined': centuryParams.length },
              )}
              onClick={() => {
                searchParams.delete('centuries');
                setSearchParams(searchParams);
              }}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
          onClick={() => {
            searchParams.delete('sex');
            searchParams.delete('centuries');
            searchParams.delete('query');
            setSearchParams(searchParams);
          }}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
