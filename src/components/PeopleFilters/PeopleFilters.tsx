import {
  FC,
  memo,
  useCallback,
  useEffect,
} from 'react';

import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { SexFilter } from '../../types/SexFilter';
import { getSearchWith } from '../../utils/searchHelper';
import { SearchLink } from '../SearchLink';

type Props = {
  people: Person[];
  setFilteredPeople: (people: Person[]) => void;
};

export const PeopleFilters: FC<Props> = memo(({
  people,
  setFilteredPeople,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex') || null;
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const centuryList = ['16', '17', '18', '19', '20'];

  const filterPeople = useCallback((peopleToFilter: Person[]) => {
    let filteredPeople = [...peopleToFilter];

    if (sex) {
      filteredPeople = filteredPeople.filter(person => person.sex === sex);
    }

    if (query) {
      const isContainQuery = (person: string | null) => {
        return person
          ? person.toLowerCase().includes(query.toLowerCase())
          : null;
      };

      filteredPeople = filteredPeople.filter(person => (
        isContainQuery(person.name)
          || isContainQuery(person.fatherName)
          || isContainQuery(person.motherName)
      ));
    }

    if (centuries.length) {
      filteredPeople = filteredPeople.filter(person => {
        const personBornCentury = Math.ceil(person.born / 100).toString();

        return centuries.includes(personBornCentury);
      });
    }

    return filteredPeople;
  }, [searchParams]);

  const handleQueryChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchParams(
        getSearchWith(searchParams, { query: event.target.value || null }),
      );
    }, [],
  );

  useEffect(() => {
    setFilteredPeople(filterPeople(people));
  }, [people, searchParams]);

  return (
    <nav className="panel">
      <p className="panel-heading">
        Filters
      </p>

      <p
        className="panel-tabs"
        data-cy="SexFilter"
      >
        {Object.entries(SexFilter).map(([key, value]) => (
          <SearchLink
            key={key}
            params={({ sex: value || null })}
            className={classNames(
              {
                'is-active': sex === value
              || (sex === null && value === ''),
              },
            )}
          >
            {key}
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
            {centuryList.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                params={{
                  centuries: centuries.includes(century)
                    ? centuries.filter(c => c !== century)
                    : [...centuries, century],
                }}
                className={classNames(
                  'button mr-1',
                  { 'is-info': centuries.includes(century) },
                )}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              params={{ centuries: null }}
              className={classNames(
                'button is-success',
                { 'is-outlined': centuries.length },
              )}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{
            sex: null,
            query: null,
            centuries: null,
          }}
          className="
            button
            is-link
            is-outlined
            is-fullwidth
          "
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
});
