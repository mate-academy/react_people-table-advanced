/* eslint-disable @typescript-eslint/indent */
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person, SexType } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [error, setError] = useState<boolean | null>(null);
  const [filteredPeople, setFilteredPeople] = useState<Person[] | null>(null);
  const [centuriesList, setCenturiesList] = useState<number[]>([]);

  const [searchParams] = useSearchParams();

  const downloadPeople = async () => {
    try {
      const tmp = await getPeople();

      setPeople(tmp);
      setError(false);
    } catch {
      setError(true);
    }
  };

  const handleCreateCenturiesList = () => {
    const tmpList: number[] = [];

    people?.map(person => {
      const tmpCentury = Math.ceil(person.born / 100);

      if (!tmpList.some(el => el === tmpCentury)) {
        tmpList.push(tmpCentury);
      }
    });
    tmpList.sort();

    setCenturiesList(tmpList);
  };

  useEffect(() => {
    downloadPeople();
  }, []);

  useEffect(() => {
    if (people) {
      setFilteredPeople(people);
      handleCreateCenturiesList();
    }
  }, [people]);

  useEffect(() => {
    if (people && people.length > 0) {
      const sexFilter = searchParams.get('sex');
      const centuryFilter = searchParams.getAll('centuries');
      const queryFilter = searchParams.get('query');
      let tmp = people;

      if (sexFilter) {
        switch (sexFilter) {
          case SexType.MALE:
            tmp = tmp.filter(person => person.sex === SexType.MALE);
            break;
          case SexType.FEMALE:
            tmp = tmp.filter(person => person.sex === SexType.FEMALE);
            break;
        }
      }

      if (centuryFilter.length > 0) {
        tmp = tmp.filter(person =>
          centuryFilter.includes(Math.ceil(person.born / 100).toString()),
        );
      }

      if (queryFilter) {
        tmp = tmp.filter(
          person =>
            person.name
              .toLocaleLowerCase()
              .match(queryFilter.toLocaleLowerCase()) ||
            (person.fatherName &&
              person.fatherName
                .toLocaleLowerCase()
                .match(queryFilter.toLocaleLowerCase())) ||
            (person.motherName &&
              person.motherName
                .toLocaleLowerCase()
                .match(queryFilter.toLocaleLowerCase())),
        );
      }

      setFilteredPeople(tmp);
    }
  }, [people, searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!error && people && people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters centuriesList={centuriesList} />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {!error && people === null && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!error && people && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!error && filteredPeople && filteredPeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!error &&
                people &&
                filteredPeople &&
                filteredPeople?.length > 0 && (
                  <PeopleTable people={filteredPeople} allPeople={people} />
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
