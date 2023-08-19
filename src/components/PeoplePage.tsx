import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { fetchPeopleData } from '../utils/fetchPeopleData';
import { SortOrder, SortQuery } from '../types/SortParams';

function calcCentury(year: number) {
  return Math.ceil(year / 100);
}

const {
  NAME, SEX, BORN, DIED, INITIAL,
} = SortQuery;

const { ASC } = SortOrder;

export const PeoplePage = () => {
  const [peopleData, setPeopleData] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [filteredList, setFilteredList] = useState<Person[]>(peopleData);

  const location = useLocation();
  const initialSearchParams = new URLSearchParams(location.search);
  const initialSearchQuery = initialSearchParams.get('searchQuery') || '';
  const initialSexParam = initialSearchParams.get('sex') || '';
  const initialCenturyParams = initialSearchParams.getAll('century') || [];

  const initialSortQuery = initialSearchParams.get('sort') || SortQuery.INITIAL;
  const initialOrderQuery = initialSearchParams.get('order') || SortOrder.ASC;

  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [sex, setSex] = useState(initialSexParam);
  const [centuries, setCenturies] = useState(initialCenturyParams);

  const [sortQuery, setSortQuery] = useState<SortQuery>(
    initialSortQuery as SortQuery,
  );
  const [sortOrder, setSortOrder] = useState<SortOrder>(
    initialOrderQuery as SortOrder,
  );
  const [sortedList, setSortedList] = useState<Person[]>(filteredList);

  const initialList = useMemo(() => {
    if (filteredList) {
      return [...filteredList];
    }

    return [];
  }, [filteredList]);

  useEffect(() => {
    setIsLoading(true);

    fetchPeopleData()
      .then((data) => {
        setPeopleData(data);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!peopleData) {
      return;
    }

    const filteredData = peopleData.filter((person) => {
      const nameMatch
        = initialSearchQuery === ''
        || person.name.toLowerCase().includes(initialSearchQuery)
        || person.motherName?.toLowerCase().includes(initialSearchQuery)
        || person.fatherName?.toLowerCase().includes(initialSearchQuery);

      const sexMatch = initialSexParam === '' || person.sex === initialSexParam;

      const centuryMatch
        = initialCenturyParams.length === 0
        || initialCenturyParams.includes(calcCentury(person.born).toString())
        || initialCenturyParams.includes(calcCentury(person.died).toString());

      return nameMatch && sexMatch && centuryMatch;
    });

    setFilteredList(filteredData);
  }, [
    searchQuery,
    peopleData,
    sex,
    centuries.length,
    initialSearchQuery,
    initialSexParam,
    initialCenturyParams.length,
  ]);

  useEffect(() => {
    if (sortQuery === INITIAL && initialList) {
      setSortedList([...initialList]);
    } else {
      setSortedList(
        [...filteredList].sort((person1, person2) => {
          switch (sortQuery) {
            case NAME:
            case SEX: {
              if (sortOrder === ASC) {
                return person1[sortQuery].localeCompare(person2[sortQuery]);
              }

              return person2[sortQuery].localeCompare(person1[sortQuery]);
            }

            case BORN:
            case DIED: {
              if (sortOrder === ASC) {
                return person1[sortQuery] - person2[sortQuery];
              }

              return person2[sortQuery] - person1[sortQuery];
            }

            default:
              return 0;
          }
        }),
      );
    }
  }, [sortQuery, sortOrder, initialList, filteredList]);

  const isMatchingResult = filteredList.length > 0;
  const isSuccessfullyLoaded = !isError && !isLoading;

  const isPeopleArrayEmpty = peopleData.length === 0 && isSuccessfullyLoaded;
  const isPersonNonExistent
    = isSuccessfullyLoaded && !isMatchingResult && !isPeopleArrayEmpty;
  const isTableVisible
    = isSuccessfullyLoaded && !isPeopleArrayEmpty && isMatchingResult;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              setSearchQuery={setSearchQuery}
              setSex={setSex}
              setCenturies={setCenturies}
            />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {isPeopleArrayEmpty && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isPersonNonExistent && (
                <p>There are no people matching the current search criteria</p>
              )}

              {isTableVisible && (
                <PeopleTable
                  peopleData={sortedList}
                  initialPeopleData={peopleData}
                  setSortQuery={setSortQuery}
                  setSortOrder={setSortOrder}
                  sortQuery={sortQuery}
                  sortOrder={sortOrder}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
