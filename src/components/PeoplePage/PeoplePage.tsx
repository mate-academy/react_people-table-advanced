import React, { useEffect, useMemo, useState } from 'react';
import { Loader } from '../Loader';
import { PeopleFilters } from '../PeopleFilter';
import { PeopleTable } from '../PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [errorLoading, setErrorLoading] = useState('');
  const [errorNoPeople, setErrorNoPeople] = useState('');

  useEffect(() => {
    setIsLoading(true);
    setErrorLoading('');
    setErrorNoPeople('');

    getPeople()
      .then(data => {
        const peopleWithParents = data.map(person => {
          const mother = data.find(p => p.name === person.motherName);
          const father = data.find(p => p.name === person.fatherName);

          return {
            ...person,
            mother,
            father,
          };
        });

        setPeople(peopleWithParents);

        if (peopleWithParents.length === 0) {
          setErrorNoPeople('There are no people on the server');
        }
      })
      .catch(() => setErrorLoading('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredPeople = useMemo(() => {
    const centuries = searchParams.getAll('centuries');
    const query = searchParams.get('query') || '';
    const sex = searchParams.get('sex');

    return people.filter(person => {
      const matchesQuery =
        person.name.toLowerCase().includes(query.toLowerCase()) ||
        person.motherName?.toLowerCase().includes(query.toLowerCase()) ||
        person.fatherName?.toLowerCase().includes(query.toLowerCase());

      const matchesCentury =
        centuries.length === 0 ||
        centuries.includes(String(Math.ceil(person.born / 100)));

      const matchesSex = !sex || person.sex === sex;

      return matchesQuery && matchesCentury && matchesSex;
    });
  }, [people, searchParams]);

  const isNoFilteredResults =
    !isLoading &&
    !errorLoading &&
    people.length > 0 &&
    filteredPeople.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !errorLoading && people.length > 0 && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && errorLoading && (
                <p data-cy="peopleLoadingError">{errorLoading}</p>
              )}

              {!isLoading && errorNoPeople && people.length === 0 && (
                <p data-cy="noPeopleMessage">{errorNoPeople}</p>
              )}

              {isNoFilteredResults && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && !errorLoading && filteredPeople.length > 0 && (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
