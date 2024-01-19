/* eslint-disable no-param-reassign */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  let normalizePeople = people.map(person => {
    const father = people.find(parent => person.fatherName === parent.name);
    const mother = people.find(parent => person.motherName === parent.name);

    if (father) {
      person.father = father;
    }

    if (mother) {
      person.mother = mother;
    }

    return person;
  });

  const filterPeople = () => {
    if (sex) {
      normalizePeople = normalizePeople.filter(person => person.sex === sex);
    }

    if (query) {
      normalizePeople = normalizePeople.filter(person => (
        person.name.toLowerCase().includes(query.toLowerCase())
        || person.fatherName?.toLowerCase().includes(query.toLowerCase())
        || person.motherName?.toLowerCase().includes(query.toLowerCase())
      ));
    }

    if (centuries.length) {
      normalizePeople = normalizePeople.filter(person => (
        centuries.includes(Math.ceil(person.born / 100).toString())
      ));
    }

    return normalizePeople;
  };

  const filteredPeople = filterPeople();
  const noErrorAndLoad = !isError && !isLoading;
  const noErrorAndLoadAndIsPeople = noErrorAndLoad && filteredPeople.length;
  const noCurrentSearchCriteria
    = noErrorAndLoadAndIsPeople && !filteredPeople.length;

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {noErrorAndLoad && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {noCurrentSearchCriteria && (
                <p>There are no people matching the current search criteria</p>
              )}

              {noErrorAndLoadAndIsPeople && (
                <PeopleTable people={filteredPeople} />
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
};
