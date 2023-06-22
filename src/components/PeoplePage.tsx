import { useSearchParams } from 'react-router-dom';
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
}) => {
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState(SortType.Original);
  const [clickCount, setClickCount] = useState(0);
  const [activeCenturies, setActiveCenturies]
  = useState<number[]>([15, 16, 17, 18, 19]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCenturySelection = (centuries: number[]) => {
    const includesCenturie
    = activeCenturies.includes(centuries[centuries.length - 1]);

    if (activeCenturies.length === 1 && includesCenturie) {
      localStorage.clear();
      setActiveCenturies([15, 16, 17, 18, 19]);
      setSearchParams({ centuries: [15, 16, 17, 18, 19].join(',') });

      localStorage.setItem('activeCenturies',
        JSON.stringify([15, 16, 17, 18, 19]));
    } else if (activeCenturies.length === 5) {
      setActiveCenturies(centuries);
      setSearchParams({ centuries: centuries.join(',') });

      localStorage.setItem('activeCenturies', JSON.stringify(centuries));
    } else if (activeCenturies.length < 5
      && activeCenturies.length > 0
      && !includesCenturie) {
      const updatedCenturies = [...activeCenturies, ...centuries];

      setSearchParams({ centuries: updatedCenturies.join(',') });

      setActiveCenturies(updatedCenturies);
      localStorage.setItem('activeCenturies', JSON.stringify(updatedCenturies));
    } else if (activeCenturies.length < 5
      && activeCenturies.length > 0
      && includesCenturie) {
      const filtered = activeCenturies.filter((number) => {
        return number !== centuries[centuries.length - 1];
      });

      setActiveCenturies(filtered);
      setSearchParams({ centuries: filtered.join(',') });

      localStorage.setItem('activeCenturies', JSON.stringify(filtered));
    } else if (activeCenturies.length === 5 && includesCenturie) {
      const emptyArray: number[] = [];

      setActiveCenturies(emptyArray);
      setSearchParams({ centuries: emptyArray.join(',') });

      setActiveCenturies([15, 16, 17, 18, 19]);
      setSearchParams({ centuries: [15, 16, 17, 18, 19].join(',') });

      localStorage.setItem('activeCenturies',
        JSON.stringify([15, 16, 17, 18, 19]));
    }
  };

  const allCenturySelection = () => {
    setActiveCenturies([15, 16, 17, 18, 19]);
    setSearchParams({ centuries: [15, 16, 17, 18, 19].join(',') });
    localStorage.setItem('activeCenturies',
      JSON.stringify([15, 16, 17, 18, 19]));
  };

  const handleSort = (column: string) => {
    setSortField(column);
    setClickCount(clickCount + 1);
  };

  const resetEveryThing = () => {
    setActiveCenturies([15, 16, 17, 18, 19]);
    setQuery('');
    sexFilterHandler(FilterType.All);
    localStorage.setItem('query', '');
    localStorage.setItem('activeCenturies',
      JSON.stringify([15, 16, 17, 18, 19]));
  };

  const setCurrentQuery = (currentQuery: string) => {
    localStorage.setItem('query', currentQuery);

    setQuery(currentQuery);
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

  const filteredPeople: NewPerson[] = useMemo(() => {
    return updatedPeople.filter((person) => {
      const functionality
      = person.name.toLowerCase().includes(query.toLowerCase().trim());
      const century = Math.floor(person.born / 100);

      switch (sexFilter) {
        case FilterType.All:
        default:
          return activeCenturies.length === 5
            ? functionality
            : functionality && activeCenturies.includes(century);
        case FilterType.Male:
          return activeCenturies.length === 5
            ? functionality && person.sex === 'm'
            : functionality
            && activeCenturies.includes(century)
            && person.sex === 'm';
        case FilterType.Female:
          return activeCenturies.length === 5
            ? functionality && person.sex === 'f'
            : functionality
            && activeCenturies.includes(century)
            && person.sex === 'f';
      }
    });
  }, [updatedPeople, activeCenturies, query, sexFilter, loading]);

  useEffect(() => {
    setIsFiltered(true);
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
    const savedCenturies = localStorage.getItem('activeCenturies');

    if (savedCenturies) {
      setActiveCenturies(JSON.parse(savedCenturies));

      setSearchParams({ centuries: savedCenturies });
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
              setActiveCenturies={setActiveCenturies}
              searchParams={searchParams}
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
