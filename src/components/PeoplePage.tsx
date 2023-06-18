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
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState(SortType.Original);
  const [clickCount, setClickCount] = useState(0);
  const [activeCenturies, setActiveCentury]
  = useState<number[]>([0]);
  const [isFiltered, setIsfiltered] = useState(false);

  const allCenturySelection = () => {
    setActiveCentury([0]);
  };

  const handleSort = (column: string) => {
    setSortField(column);
    setClickCount(clickCount + 1);
  };

  const resetEveryThing = () => {
    setActiveCentury([0]);
    setQuery('');
    sexFilterHandler(FilterType.All);
    localStorage.setItem('query', '');
    localStorage.setItem('activeCenturies', '');
  };

  const setCurrentQuery = (currentQuery: string) => {
    localStorage.setItem('query', currentQuery);

    setQuery(currentQuery);
  };

  const handleCenturySelection = (century: number[]) => {
    const singleCentury = century.pop();

    const includesCenturie
     = activeCenturies.includes(singleCentury || 0);

    if (includesCenturie && activeCenturies.length === 6) {
      const filtered = activeCenturies.filter((number) => {
        return number === singleCentury;
      });

      setActiveCentury(filtered);
      localStorage.setItem(
        'activeCenturies', JSON.stringify(filtered),
      );
    } else if (!includesCenturie
    && activeCenturies.length !== 6) {
      setActiveCentury([...activeCenturies, singleCentury || 0]);
      localStorage.setItem(
        'activeCenturies', JSON.stringify(
          [...activeCenturies, singleCentury || 0],
        ),
      );
    } else if (includesCenturie) {
      const filtered = activeCenturies.filter((number) => {
        return number !== singleCentury || 0;
      });

      setActiveCentury(filtered);
      localStorage.setItem(
        'activeCenturies', JSON.stringify(filtered),
      );
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
          return activeCenturies.length === 2
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
          return sortOrder === SortType.Asc
            ? elem1[sortField].localeCompare(elem2[sortField])
            : elem2[sortField].localeCompare(elem1[sortField]);

        case PropName.Born:
        case PropName.Died:
          return sortOrder === SortType.Asc
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
      setSortOrder(SortType.Asc);
    } else if (clickCount === 2) {
      setSortOrder(SortType.Desc);
    } else if (clickCount === 3) {
      setSortField(null);
      setClickCount(0);
      setSortOrder(SortType.Original);
    }
  }, [sortField, clickCount, setSortOrder, setSortField, setClickCount]);

  useEffect(() => {
    const savedQuery = localStorage.getItem('activeCenturies');

    if (savedQuery) {
      setActiveCentury(prevActiveCenturies => {
        return [...prevActiveCenturies, ...JSON.parse(savedQuery)];
      });
    }
  }, []);

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
