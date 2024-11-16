import { CompletePerson } from '../types';
import classNames from 'classnames';
import { SearchParams } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';
import { useEffect } from 'react';

type Props = {
  people: CompletePerson[];
  setCurrentPeopleList: (filteredPeople: CompletePerson[]) => void;
  searchParams: URLSearchParams;
  setSearchWith: (params: SearchParams) => void;
};

enum Sex {
  All = '',
  Male = 'm',
  Female = 'f',
}

const createCenturieRange = (start: number, end: number) => {
  const result = [];

  for (let i = start; i <= end; i++) {
    result.push(i);
  }

  return result;
};

const centurieRange = createCenturieRange(16, 20);

export const PeopleFilters: React.FC<Props> = ({
  people,
  setCurrentPeopleList,
  searchParams,
  setSearchWith,
}) => {
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');

  let newPeopleList: CompletePerson[] = people;

  const sexKeys = Object.keys(Sex);
  const sexValues = Object.values(Sex);

  const createNewCenturieList = (newCenturie: string) => {
    return centuries.includes(newCenturie)
      ? centuries.filter(currentCenturie => currentCenturie !== newCenturie)
      : [...centuries, newCenturie];
  };

  const findName = (name: string | null, normalizedQuery: string) => {
    if (!name) {
      return false;
    }

    return name.toLowerCase().includes(normalizedQuery);
  };

  const onNameFilter = () => {
    const normalizedQuery = query.toLowerCase().trim();

    if (normalizedQuery !== '') {
      newPeopleList = newPeopleList.filter(
        person =>
          findName(person.name, normalizedQuery) ||
          findName(person.fatherName, normalizedQuery) ||
          findName(person.motherName, normalizedQuery),
      );
    }
  };

  const onSexFilter = () => {
    if (sex !== '') {
      newPeopleList = newPeopleList.filter(person => person.sex === sex);
    }
  };

  const onCenturieFilter = () => {
    const centuriesList = centuries.map(centurie => +centurie);

    const firstPossibleYear = (centurie: number) => (centurie - 1) * 100 + 1;
    const lastPossibleYear = (centurie: number) => centurie * 100 - 1;

    const bornFilteredList: CompletePerson[] = [];

    if (centuries.length > 0) {
      for (const centurie of centuriesList) {
        const thisCenturieList = newPeopleList.filter(
          person =>
            person.born >= firstPossibleYear(centurie) &&
            person.born <= lastPossibleYear(centurie),
        );

        bornFilteredList.push(...thisCenturieList);
      }

      newPeopleList = bornFilteredList;
    }
  };

  useEffect(() => {
    onSexFilter();
    onNameFilter();
    onCenturieFilter();

    setCurrentPeopleList(newPeopleList);
  }, [sex, query, centuries]);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sexKeys.map((key, i) => (
          <SearchLink
            key={key}
            className={classNames({
              'is-active': sex === sexValues[i],
            })}
            params={{ sex: sexValues[i] || null }}
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
            value={query}
            onChange={event =>
              setSearchWith({ query: event.target.value || null })
            }
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
            {centurieRange.map(centurie => (
              <SearchLink
                key={centurie}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(String(centurie)),
                })}
                params={{ centuries: createNewCenturieList(String(centurie)) }}
              >
                {centurie}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length !== 0,
              })}
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ query: null, sex: null, centuries: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
