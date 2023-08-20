import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { SortBy } from '../types/SortBy';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    setError(false);

    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const preperedPeople: Person[] = useMemo(() => {
    let withMumDad = people.map(person => {
      const mother = people
        .find(mum => mum.name === person.motherName) || undefined;
      const father = people
        .find(dad => dad.name === person.fatherName) || undefined;

      return {
        ...person,
        mother,
        father,
      };
    });

    const query = searchParams.get('query');

    if (query) {
      withMumDad = withMumDad
        .filter(person => {
          const personName = person.name.toLowerCase();
          const fatherName = person.fatherName?.toLowerCase();
          const motherName = person.motherName?.toLowerCase();
          const normalQuery = query.toLowerCase();

          return personName.includes(normalQuery)
            || fatherName?.includes(normalQuery)
            || motherName?.includes(normalQuery);
        });
    }

    const centuries = searchParams.getAll('centuries');

    if (centuries.length > 0) {
      withMumDad = withMumDad
        .filter(person => centuries
          .find(century => Math.ceil(person.born / 100) === +century));
    }

    const sex = searchParams.get('sex');

    if (sex) {
      withMumDad = withMumDad.filter(person => person.sex === sex);
    }

    const sort = searchParams.get('sort');
    const order = searchParams.get('order');

    if (sort) {
      switch (sort) {
        case SortBy.Name:
        case SortBy.Sex:
          withMumDad.sort((a, b) => a[sort].localeCompare(b[sort]));
          break;

        case SortBy.Born:
        case SortBy.Died:
          withMumDad.sort((a, b) => a[sort] - b[sort]);
          break;

        default:
      }
    }

    if (order) {
      withMumDad.reverse();
    }

    return withMumDad;
  }, [people, searchParams]);

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
              {isLoading && (
                <Loader />
              )}

              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {false && (
                <p>There are no people matching the current search criteria</p>
              )}

              {preperedPeople.length > 0 && (
                <PeopleTable preperedPeople={preperedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
