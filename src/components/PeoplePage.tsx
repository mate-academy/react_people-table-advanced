/* eslint-disable no-console */
/* eslint-disable max-len */
import React from 'react';
import { useLocation } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { fetchPeopleData } from '../utils/fetchPeopleData';
import { SortOrder, SortQuery } from '../types/SortQuery';

function calcCentury(year: number) {
  return Math.ceil(year / 100);
}

const {
  NAME,
  SEX,
  BORN,
  DIED,
  INITIAL,
} = SortQuery;

const { ASC, DESC } = SortOrder;

export const PeoplePage = () => {
  const [peopleData, setPeopleData] = React.useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const [filteredList, setFilteredList] = React.useState<Person[] | null>(null);

  const location = useLocation();
  const initialSearchParams = new URLSearchParams(location.search);
  const initialSearchQuery = initialSearchParams.get('searchQuery') || '';
  const initialSexParam = initialSearchParams.get('sex') || '';
  const initialCenturyParams = initialSearchParams.getAll('century');

  const [searchQuery, setSearchQuery] = React.useState(initialSearchQuery);
  const [sex, setSex] = React.useState(initialSexParam);
  const [centuries, setCenturies] = React.useState(initialCenturyParams);

  const [sortQuery, setSortQuery] = React.useState<SortQuery>(INITIAL);
  const [sortOrder, setSortOrder] = React.useState<SortOrder>(ASC);

  React.useEffect(() => {
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

  React.useEffect(() => {
    if (peopleData) {
      const filteredData = peopleData.filter(
        (person: Person) => (initialSearchQuery === ''
          || person.name.toLowerCase().includes(initialSearchQuery)
          || person.motherName?.toLowerCase().includes(initialSearchQuery)
          || person.fatherName?.toLowerCase().includes(initialSearchQuery))
          && (initialSexParam === '' || person.sex === initialSexParam)
          && (initialCenturyParams.length === 0
            || initialCenturyParams.includes(calcCentury(person.born).toString() || calcCentury(person.died).toString())),
      );

      if (filteredData) {
        setFilteredList(filteredData);
      }
    }
  }, [searchQuery, peopleData, sex, centuries.length]);

  React.useEffect(() => {
    console.log(sortQuery);

    if (filteredList) {
      const sortedData = filteredList.sort((person1, person2) => {
        switch (sortQuery) {
          case NAME:
          case SEX:
            return person1[sortQuery].localeCompare(person2[sortQuery]);

          case BORN:
          case DIED:
            return person1[sortQuery] - person2[sortQuery];

          case INITIAL:
          default:
            return 0;
        }
      });

      setFilteredList(sortedData);
    }
  }, [filteredList, sortQuery]);

  const sortedList = React.useMemo(() => {
    return filteredList?.sort((person1, person2) => {
      switch (sortQuery) {
        case NAME:
        case SEX:
          return person1[sortQuery].localeCompare(person2[sortQuery]);

        case BORN:
        case DIED:
          return person1[sortQuery] - person2[sortQuery];

        case INITIAL:
        default:
          return 0;
      }
    }) || null;
  }, [sortQuery, sortOrder, filteredList]);

  const isMatchingResult = filteredList && filteredList.length > 0;
  const isSuccessfullyLoaded = !isError
    && !isLoading
    && peopleData
    && isMatchingResult;

  const isPeopleArrayEmpty = peopleData?.length === 0 && !isError;

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

              {isError
              && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {isPeopleArrayEmpty && isSuccessfullyLoaded
              && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isMatchingResult
                && (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )}

              {isSuccessfullyLoaded
                && (
                  <PeopleTable
                    peopleData={sortedList || filteredList}
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
