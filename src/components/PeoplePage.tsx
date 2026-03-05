import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

type FiltersParams = {
  sex?: string;
  centuries?: string[];
  query?: string;
};

const getCentury = (person: Person): number => {
  const personCentury = Math.ceil(person.born / 100);

  return personCentury;
};

const filteredPeople = (people: Person[], filters: FiltersParams): Person[] => {
  const centuries = filters.centuries?.map(Number) ?? [];

  return people.filter(person => {
    if (person.sex !== filters.sex && filters.sex !== 'all') {
      return false;
    } else if (
      centuries.length > 0 &&
      !centuries.includes(getCentury(person))
    ) {
      return false;
    } else if (filters.query) {
      const query = filters.query.toLowerCase().trim();

      return (
        person.name.toLowerCase().includes(query) ||
        person.motherName?.toLowerCase().includes(query) ||
        person.fatherName?.toLowerCase().includes(query)
      );
    }

    return true;
  });
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoadingPeople, setIsLoadingPeople] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex') ?? 'all';
  const centuries = searchParams.getAll('centuries');
  const query = searchParams.get('query') || '';

  useEffect(() => {
    setErrorMessage('');
    setIsLoadingPeople(true);

    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoadingPeople(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoadingPeople && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoadingPeople && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {!isLoadingPeople && people && people?.length <= 0 ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : (
                !isLoadingPeople &&
                people &&
                people?.length >= 0 && (
                  <PeopleTable
                    people={filteredPeople(people, { sex, centuries, query })}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
