import React, { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { PeopleTable } from '../components/PeopleTable';
import { getPeople } from '../api';
import { PeopleFilters } from '../components/PeopleFilters';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [peopleLoadingError, setPeopleLoadingError] = useState(false);
  const [selectedPersonSlug, setSelectedPersonSlug] = useState<string | null>(
    null,
  );
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const handleSelectPerson = (slug: string) => {
    setSelectedPersonSlug(slug);
  };

  // console.log(people);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const filterAndSortPeople = (people: Person[]) => {
    let filtered = [...people];

    if (query) {
      filtered = filtered.filter(
        person =>
          person.name.toLowerCase().includes(query.toLowerCase()) ||
          person.motherName?.toLowerCase().includes(query.toLowerCase()) ||
          person.fatherName?.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (sex) {
      filtered = filtered.filter(person => person.sex === sex);
    }

    if (centuries.length) {
      filtered = filtered.filter(person => {
        const century = Math.ceil(person.born / 100);

        return centuries.includes(century.toString());
      });
    }

    if (sort) {
      filtered.sort((a, b) => {
        const valueA = a[sort as keyof Person];
        const valueB = b[sort as keyof Person];

        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return order === 'desc'
            ? valueB.localeCompare(valueA)
            : valueA.localeCompare(valueB);
        }

        if (typeof valueA === 'number' && typeof valueB === 'number') {
          return order === 'desc' ? valueB - valueA : valueA - valueB;
        }

        return 0;
      });
    }

    return filtered;
  };

  const visiblePeople = filterAndSortPeople(people);

  useEffect(() => {
    setIsLoading(true);
    setPeopleLoadingError(false);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setPeopleLoadingError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {peopleLoadingError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && people?.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {visiblePeople.length > 0 && (
                <PeopleTable
                  people={visiblePeople}
                  selectedPersonSlug={selectedPersonSlug}
                  onSelectPerson={handleSelectPerson}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
