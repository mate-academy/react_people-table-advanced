import {
  useSearchParams,
} from 'react-router-dom';
import React, {
  useMemo, useState, useEffect,
} from 'react';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { Person, NewPerson } from '../types';
import { FilterType, SortType, PropName } from '../types/enum';

interface Props {
  people: Person[],
  loading: boolean,
  isError: boolean,
}

export const PeoplePage: React.FC<Props> = ({
  people,
  loading,
  isError,
}) => {
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState(SortType.Original);
  const [clickCount, setClickCount] = useState(0);
  const [newPeople, setNewPeople] = useState<NewPerson[]>([]);
  const [activeCenturies, setActiveCenturies]
  = useState<number[]>([15, 16, 17, 18, 19]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFiltered, setIsFiltered] = useState(false);
  const firstLoad = searchParams.get('firstLoad') || '0';
  const query = searchParams.get('query') || '';
  const sexFilter = searchParams.get('sex') || 'All';
  const selectedCenturies
  = searchParams.get('centuries') || '[15, 16, 17, 18, 19]';

  const handleCenturySelection = (centuries: number[]) => {
    const includesCenturie
    = activeCenturies.includes(centuries[centuries.length - 1]);

    if (activeCenturies.length === 1 && includesCenturie) {
      localStorage.clear();
      setActiveCenturies([15, 16, 17, 18, 19]);
      setSearchParams({ centuries: [15, 16, 17, 18, 19].join(',') });
    } else if (activeCenturies.length === 5) {
      setActiveCenturies(centuries);
      setSearchParams({ centuries: centuries.join(',') });
    } else if (activeCenturies.length < 5
      && activeCenturies.length > 0
      && !includesCenturie) {
      const updatedCenturies = [...activeCenturies, ...centuries];

      setSearchParams({ centuries: updatedCenturies.join(',') });

      setActiveCenturies(updatedCenturies);
    } else if (activeCenturies.length < 5
      && activeCenturies.length > 0
      && includesCenturie) {
      const filtered = activeCenturies.filter((number) => {
        return number !== centuries[centuries.length - 1];
      });

      setActiveCenturies(filtered);
      setSearchParams({ centuries: filtered.join(',') });
    } else if (activeCenturies.length === 5 && includesCenturie) {
      const emptyArray: number[] = [];

      setActiveCenturies(emptyArray);
      setSearchParams({ centuries: emptyArray.join(',') });

      setActiveCenturies([15, 16, 17, 18, 19]);
      setSearchParams({ centuries: [15, 16, 17, 18, 19].join(',') });
    }
  };

  const allCenturySelection = () => {
    setActiveCenturies([15, 16, 17, 18, 19]);
    setSearchParams({ centuries: [15, 16, 17, 18, 19].join(',') });
  };

  const handleSort = (column: string) => {
    setSortField(column);
    setClickCount(clickCount + 1);
  };

  const sexFilterHandler = (value: FilterType) => {
    setSearchParams({ sex: value });
  };

  const resetEveryThing = () => {
    setActiveCenturies([15, 16, 17, 18, 19]);
    sexFilterHandler(FilterType.All);
    setSearchParams({ centuries: [15, 16, 17, 18, 19].join(',') });
    setSearchParams({ query: '' });
  };

  const setCurrentQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchedName = (e.target as HTMLInputElement).value;

    if (searchedName) {
      searchParams.set('query', searchedName);
      const params = { query: (searchedName) };

      window.history.pushState(null, JSON.stringify(params));
    } else {
      searchParams.delete('query');
    }

    setSearchParams(searchParams);
  };

  const deleteSearch = () => {
    const newParams = new URLSearchParams(searchParams);

    newParams.delete('query');

    setSearchParams(newParams);
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
    return newPeople.filter((person) => {
      const functionality
      = person.name.toLowerCase().includes(query.toLowerCase().trim());
      const century = Math.floor(person.born / 100);

      switch (sexFilter) {
        case FilterType.All:
        default:
          return selectedCenturies.length === 5
            ? functionality
            : functionality && selectedCenturies.includes(century.toString());
        case FilterType.Male:
          return selectedCenturies.length === 5
            ? functionality && person.sex === 'm'
            : functionality
            && selectedCenturies.includes(century.toString())
            && person.sex === 'm';
        case FilterType.Female:
          return selectedCenturies.length === 5
            ? functionality && person.sex === 'f'
            : functionality
            && selectedCenturies.includes(century.toString())
            && person.sex === 'f';
      }
    });
  }, [updatedPeople, selectedCenturies, query, sexFilter, loading]);

  useEffect(() => {
    setIsFiltered(true);
  }, [query, sexFilter, selectedCenturies]);

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
    const setedCentuires = searchParams.get('centurise');

    if (setedCentuires === null && firstLoad === '0') {
      setSearchParams({ centuries: [15, 16, 17, 18, 19].join(',') });
      setSearchParams({ sex: FilterType.All });
      setSearchParams({ firstLoad: '1' });

      setActiveCenturies([15, 16, 17, 18, 19]);
    }
  }, []);

  useEffect(() => {
    const indexedPeople = people.map((person, index) => {
      return {
        ...person,
        index: index + 1,
      };
    });

    setNewPeople(indexedPeople);
  }, [people]);

  return (
    <>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              sexFilterHandler={sexFilterHandler}
              setCurrentQuery={setCurrentQuery}
              query={query}
              handleCenturySelection={handleCenturySelection}
              allCenturySelection={allCenturySelection}
              activeCenturies={activeCenturies}
              resetEveryThing={resetEveryThing}
              sexFilter={sexFilter}
              setActiveCenturies={setActiveCenturies}
              searchParams={searchParams}
              deleteSearch={deleteSearch}
            />
          </div>

          <div className="column">
            <div className="box table-container">

              <PeopleTable
                people={sortingAscOrDesc}
                handleSort={handleSort}
                sortOrder={sortOrder}
                sortField={sortField}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
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
