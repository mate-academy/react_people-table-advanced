import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [error, setError] = useState('');
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const sortField = searchParams.get('sortField') || '';
  const sortOrder = searchParams.get('sortOrder') || '';

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setError('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const normalizeName = (name: string | null) => {
    return name?.toLowerCase();
  };

  const filterPeople = (peopleLoaded: Person[]) => {
    let filteredPeople = [...peopleLoaded];

    if (centuries.length) {
      filteredPeople = filteredPeople.filter(
        (person) => centuries.includes(Math.ceil(person.born / 100).toString())
          || centuries.includes(Math.ceil(person.born / 100).toString()),
      );
    }

    if (sex) {
      filteredPeople = filteredPeople.filter(person => person.sex === sex);
    }

    if (query) {
      const normalizedQuery = query.toLowerCase().trim();

      filteredPeople = filteredPeople
        .filter(person => normalizeName(person.name)?.includes(normalizedQuery)
          || normalizeName(person.motherName)?.includes(normalizedQuery)
          || normalizeName(person.fatherName)?.includes(normalizedQuery));
    }

    if (sortField) {
      filteredPeople = filteredPeople.sort((personOne, personTwo) => {
        switch (sortField) {
          case 'Name':
            return personOne.name.localeCompare(personTwo.name);
          case 'Sex':
            return personOne.sex.localeCompare(personTwo.sex);
          case 'Born':
            return personOne.born - personTwo.born;
          case 'Died':
            return personOne.died - personTwo.died;
          default:
            return 0;
        }
      });
    }

    if (sortOrder === 'desc') {
      filteredPeople = filteredPeople.reverse();
    }

    return filteredPeople;
  };

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

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {error}
                </p>
              )}

              {!error && !people.length && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!error && !isLoading && !!people.length
                && !filterPeople(people).length
                && (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )}

              {!!filterPeople(people).length && (
                <PeopleTable
                  people={filterPeople(people)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
