import React, {
  useMemo, useState, useEffect,
} from 'react';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { NewPerson } from '../types';
import { FilterType, SortType, PropName } from '../types/enum';

interface Props {
  people: NewPerson[],
  loading: boolean,
  sexFilter: FilterType,
  sexFilterHandler: (value: FilterType) => void,
  setQuery: (value: string) => void,
  query: string,
  deleteQuery: () => void,
  isError: boolean,
  fetchPeople: () => Promise<void>;
}

export const PeoplePage: React.FC<Props> = ({
  people,
  loading,
  sexFilter,
  sexFilterHandler,
  setQuery,
  query,
  deleteQuery,
  isError,
  fetchPeople,
}) => {
  const [sortField, setsortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState(SortType.original);
  const [clickCount, setClickCount] = useState(0);
  const [activeCenturies, setactiveCenturies]
  = useState<number[]>([]);
  const [isFiltered, setIsfiltered] = useState(false);

  const allCenturySelection = () => {
    setactiveCenturies([]);
  };

  const handleSort = (column: string) => {
    setsortField(column);
    setClickCount(clickCount + 1);
  };

  const resetEveryThing = () => {
    setactiveCenturies([]);
    setQuery('');
    sexFilterHandler(FilterType.All);
    localStorage.setItem('query', '');
  };

  const setCurrentQuery = (currentQuery: string) => {
    localStorage.setItem('query', currentQuery);

    setQuery(currentQuery);
  };

  const handleCenturySelection = (century: number) => {
    const includesCenturie = activeCenturies.includes(century);

    if (includesCenturie && activeCenturies.length === 5) {
      const filtered = activeCenturies.filter((number) => {
        return number === century;
      });

      setactiveCenturies(filtered);
    } else if (!includesCenturie
    && activeCenturies.length !== 5) {
      setactiveCenturies([...activeCenturies, century]);
    } else if (includesCenturie) {
      const filtered = activeCenturies.filter((number) => {
        return number !== century;
      });

      setactiveCenturies(filtered);
    }
  };

  const updatedPeople = people.map((child) => {
    if (!child.motherName && !child.fatherName) {
      return {
        ...child,
        motherName: '-',
        fatherName: '-',
      };
    }

    if (!child.fatherName) {
      return {
        ...child,
        fatherName: '-',
      };
    }

    if (!child.motherName) {
      return {
        ...child,
        motherName: '-',
      };
    }

    const father = people.find((parent) => parent.name === child.fatherName);
    const mother = people.find((parent) => parent.name === child.motherName);

    return {
      ...child,
      father,
      mother,
    };
  });

  const filteredPeople: NewPerson[] = useMemo(
    () => updatedPeople.filter((person) => {
      const functionality
       = person.name.toLowerCase().includes(query.toLowerCase().trim());
      const centurie = Math.floor(person.born / 100);

      switch (sexFilter) {
        case FilterType.All:
        default:
          return activeCenturies.length === 0
            ? functionality
            : functionality && activeCenturies.includes(centurie);
        case FilterType.Male:
          return (
            activeCenturies.length === 0
              ? (person.sex === 'm'
              && functionality)
              : (person.sex === 'm'
              && functionality
              && activeCenturies.includes(centurie))
          );
        case FilterType.Female:
          return (
            activeCenturies.length === 0
              ? (person.sex === 'f'
              && functionality)
              : (person.sex === 'f'
              && functionality
              && activeCenturies.includes(centurie))
          );
      }
    }),
    [sexFilter, query, loading, activeCenturies, fetchPeople],
  );

  useEffect(() => {
    setIsfiltered(true);
  }, [query, sexFilter, activeCenturies]);

  const sortingAscOrDesc = useMemo(() => {
    return filteredPeople.sort((elem1, elem2) => {
      switch (sortField) {
        case PropName.Name:
        case PropName.Sex:
          return sortOrder === SortType.asc
            ? elem1[sortField].localeCompare(elem2[sortField])
            : elem2[sortField].localeCompare(elem1[sortField]);

        case PropName.Born:
        case PropName.Died:
          return sortOrder === SortType.asc
            ? elem1[sortField] - elem2[sortField]
            : elem2[sortField] - elem1[sortField];

        default:
          return elem1.index - elem2.index;
      }
    });
  }, [filteredPeople, sortField, sortOrder]);

  useEffect(() => {
    if (sortField === null) {
      return;
    }

    if (clickCount === 1) {
      setSortOrder(SortType.asc);
    } else if (clickCount === 2) {
      setSortOrder(SortType.desc);
    } else if (clickCount === 3) {
      setsortField(null);
      setClickCount(0);
      setSortOrder(SortType.original);
    }
  }, [sortField, clickCount, setSortOrder, setsortField, setClickCount]);

  return (
    <>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              sexFilterHandler={sexFilterHandler}
              setCurrentQuery={setCurrentQuery}
              query={query}
              deleteQuery={deleteQuery}
              handleCenturySelection={handleCenturySelection}
              allCenturySelection={allCenturySelection}
              activeCenturies={activeCenturies}
              resetEveryThing={resetEveryThing}
              sexFilter={sexFilter}
            />
          </div>

          <div className="column">
            <div className="box table-container">

              <PeopleTable
                people={sortingAscOrDesc}
                handleSort={handleSort}
                sortOrder={sortOrder}
                sortField={sortField}
              />

              {isFiltered && filteredPeople.length === 0 && !isError && (
                <p>There are no people matching the current search criteria</p>
              )}
              {!isFiltered && filteredPeople.length === 0 && !isError && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isFiltered && isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};
