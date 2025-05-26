import { useEffect, useState } from 'react';

import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

import { getPeople } from '../api';

import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';
import { SortField } from './SortTypes';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [people, setPeople] = useState<Person[]>([]);

  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex') || null;
  const query = searchParams.get('query') || null;
  const centuries = searchParams.getAll('centuries') || [];
  const sortField = searchParams.get('sort') || null;

  const [isServerError, setIsServerError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(response => {
        setPeople(response);
      })
      .catch(() => setIsServerError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const visiblePeople = people.filter(person => {
    // check if sex was set and filter people by sex
    if (sex && person.sex !== sex) {
      return false;
    }

    // checks if query was set and filters people by their name, father name and mother name
    if (
      query &&
      !person.name.includes(query) &&
      !person.motherName?.includes(query) &&
      !person.fatherName?.includes(query)
    ) {
      return false;
    }

    // checks if born or death year is within certain century
    if (
      centuries.length > 0 &&
      !centuries.includes(`${Math.ceil(person.born / 100)}`)
    ) {
      return false;
    }

    return true;
  });

  // SORTING
  if (sortField) {
    visiblePeople.sort((person1, person2) => {
      switch (sortField) {
        case SortField.Name:
          const name1 = person1.name.toLowerCase();
          const name2 = person2.name.toLowerCase();

          return name1.localeCompare(name2);

        case SortField.Sex:
          const sex1 = person1.sex.toLowerCase();
          const sex2 = person2.sex.toLowerCase();

          return sex1.localeCompare(sex2);

        case SortField.Born:
          return person1.born - person2.born;

        case SortField.Died:
          return person1.died - person2.died;

        default:
          return 0;
      }
    });
  }

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

              {isServerError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!people.length && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !visiblePeople.length && !!people.length && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && !!visiblePeople.length && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
