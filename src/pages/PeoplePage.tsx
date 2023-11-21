import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { preparePeopleData } from '../utils/prepareData';
import { SearchParams, getSearchWith } from '../utils/searchHelper';
import { Loader } from '../components/Loader';
import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [visiblePeople, setVisiblePeople] = useState<Person[]>(people);
  const [peopleLoading, setPeopleLoading] = useState(false);
  const [isLoadingError, setIsLoadingError] = useState(false);

  const query = searchParams.get('query') || '';
  const filterBySex = searchParams.get('sex') || null;
  const filterByCentury = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const isDataAvailable = !peopleLoading && people.length > 0;
  const isArrayEmpty = !peopleLoading && people.length === 0;
  const noVisiblePeople = !peopleLoading && visiblePeople.length === 0;

  useEffect(() => {
    setIsLoadingError(false);
    setPeopleLoading(true);

    getPeople()
      .then((response) => {
        const preparedData = preparePeopleData(response);

        setPeople(preparedData);
      })
      .catch(() => setIsLoadingError(true))
      .finally(() => setPeopleLoading(false));
  }, []);

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  };

  const getPeopleToRender = (allPeople: Person[]) => {
    let filteredPeople: Person[] = [...allPeople];

    if (query) {
      const lowerQuery = query.toLowerCase();

      filteredPeople = filteredPeople.filter(person => (
        person.name.toLowerCase().includes(lowerQuery)
        || person.motherName?.toLowerCase().includes(lowerQuery)
        || person.fatherName?.toLowerCase().includes(lowerQuery)
      ));
    }

    if (filterBySex) {
      filteredPeople = filteredPeople
        .filter(person => person.sex === filterBySex);
    }

    if (filterByCentury.length) {
      filteredPeople = filteredPeople
        .filter(person => filterByCentury
          .includes(Math.ceil(person.born / 100).toString()));
    }

    if (sort) {
      switch (sort) {
        case 'name':
        case 'sex':
          filteredPeople = filteredPeople
            .sort((a, b) => a[sort].localeCompare(b[sort]));
          break;
        case 'born':
        case 'died':
          filteredPeople = filteredPeople
            .sort((a, b) => a[sort] - b[sort]);
          break;
        default:
          break;
      }
    }

    if (order === 'desc') {
      filteredPeople = [...filteredPeople].reverse();
    }

    return filteredPeople;
  };

  useEffect(() => {
    const updatedPeople = getPeopleToRender(people);

    setVisiblePeople(updatedPeople);
  }, [searchParams, people]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {isDataAvailable && (
              <PeopleFilters setSearchWith={setSearchWith} />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {peopleLoading && <Loader />}

              {isLoadingError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isDataAvailable && visiblePeople.length > 0 && (
                <PeopleTable people={visiblePeople} />)}

              {isArrayEmpty && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {noVisiblePeople && (
                <p data-cy="noPeopleMessage">
                  There are no people matching the current search criteria
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
