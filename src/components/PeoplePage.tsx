import { useState, useEffect } from 'react';
import { Person } from '../types';
import { ErrorMessages } from '../types/ErrorMessages';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Sorts } from '../types/SortsValue';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorMessages | null>(null);
  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex') || 'All';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order') || 'asc';

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setError(ErrorMessages.LoadError))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredPeople = people
    .filter(person => (sex === 'All' ? true : person.sex === sex))
    .filter(person => {
      if (query) {
        return (
          person.name.toLowerCase().includes(query.toLowerCase()) ||
          person.motherName?.toLowerCase().includes(query.toLowerCase()) ||
          person.fatherName?.toLowerCase().includes(query.toLowerCase())
        );
      }

      return true;
    })
    .filter(person => {
      if (centuries.length) {
        const personCentury = Math.ceil(person.born / 100).toString();

        return centuries.includes(personCentury);
      }

      return true;
    });

  switch (sort) {
    case Sorts.Name:
      filteredPeople.sort((person1, person2) =>
        order === 'desc'
          ? person2.name.localeCompare(person1.name)
          : person1.name.localeCompare(person2.name),
      );
      break;
    case Sorts.Sex:
      filteredPeople.sort((person1, person2) =>
        order === 'desc'
          ? person2.sex.localeCompare(person1.sex)
          : person1.sex.localeCompare(person2.sex),
      );
      break;
    case Sorts.Born:
      filteredPeople.sort((person1, person2) =>
        order === 'desc'
          ? person2.born - person1.born
          : person1.born - person2.born,
      );
      break;
    case Sorts.Died:
      filteredPeople.sort((person1, person2) =>
        order === 'desc'
          ? person2.died - person1.died
          : person1.died - person2.died,
      );
      break;
    default:
      break;
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {ErrorMessages.LoadError}
                </p>
              )}
              {!isLoading && !error && !people.length && (
                <p data-cy="noPeopleMessage">{ErrorMessages.NoPeople}</p>
              )}

              {!filteredPeople.length ? (
                <p>{ErrorMessages.IncorFilter}</p>
              ) : (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
