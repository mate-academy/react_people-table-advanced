import React, { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const sex = searchParams.get('sex');
    const query = searchParams.get('query');
    const centuries = searchParams.getAll('centuries');

    setFilteredPeople(
      people.filter(person => {
        if (searchParams.has('sex')) {
          if (sex && person.sex !== sex) {
            return false;
          }
        }

        if (searchParams.has('query')) {
          if (query) {
            const name = person.name;
            const mother = person.motherName;
            const father = person.fatherName;

            const all = name + mother + father;

            if (!all.toLowerCase().includes(query.toLowerCase())) {
              return false;
            }
          }
        }

        if (searchParams.has('centuries')) {
          if (centuries.length > 0) {
            const personCentury = Math.ceil(person.born / 100);

            if (!centuries.includes(personCentury.toString())) {
              return false;
            }
          }
        }

        return true;
      }),
    );
  }, [searchParams, people]);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      setPeople([]);
      setHasError(false);
    };
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      {isLoading && <Loader />}

      {!isLoading && people.length === 0 && !hasError && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      {hasError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {people.length > 0 && !hasError && (
        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
            <div className="column">
              <div className="box table-container">
                <PeopleTable filteredPeople={filteredPeople} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
