import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { PeopleFilters } from './PeopleFilters';

export const PeoplePage = () => {
  const { slug = '' } = useParams();
  const [searchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoadingError, setIsLoadingError] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  const isValidByQuery = (person: Person, query: string) => {
    const normalizedQuery = query.toLowerCase();
    const name = person.name.toLowerCase();
    const fatherName = person.fatherName ? person.fatherName.toLowerCase() : '';
    const motherName = person.motherName ? person.motherName.toLowerCase() : '';

    return name.includes(normalizedQuery)
      || fatherName.includes(normalizedQuery)
      || motherName.includes(normalizedQuery);
  };

  const isValidByCentury = (person: Person, centuries: string[]) => {
    return centuries.some(century => +century === Math.ceil(person.born / 100));
  };

  const filteredPeople = useMemo<Person[]>(() => {
    const sex = searchParams.get('sex') || null;
    const query = searchParams.get('query') || '';
    const centuries = searchParams.getAll('centuries') || [];

    if (!people) {
      return [];
    }

    return people.filter((person) => {
      if (sex) {
        if (centuries.length) {
          return person.sex === sex
          && isValidByQuery(person, query)
          && isValidByCentury(person, centuries);
        }

        return person.sex === sex
          && isValidByQuery(person, query);
      }

      if (centuries.length) {
        return (
          isValidByQuery(person, query) && isValidByCentury(person, centuries)
        );
      }

      return isValidByQuery(person, query);
    });
  }, [people, searchParams]);

  const getPeopleWithParents = (prev: Person[]) => {
    return prev.map((person) => {
      return {
        ...person,
        mother: prev.find((mother) => mother.name === person.motherName),
        father: prev.find((father) => father.name === person.fatherName),
      };
    });
  };

  const getPeopleList = async () => {
    setIsLoader(true);
    try {
      const peopleList = await getPeople();
      const peopleWithParents = getPeopleWithParents(peopleList);

      setPeople(peopleWithParents);
    } catch {
      setIsLoadingError(true);
    } finally {
      setIsLoader(false);
    }
  };

  useEffect(() => {
    getPeopleList();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {(!people.length && isLoader) && <Loader /> }

              {filteredPeople.length > 0
                && (
                  <PeopleTable people={filteredPeople} selectedSlug={slug} />
                )}

              {(people.length > 0 && !filteredPeople.length) && (
                <p>
                  There are no people matching the current search criteria
                </p>
              )}

              {isLoadingError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {(!isLoader && !people.length) && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
