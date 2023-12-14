import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';
import { SortParams } from '../types/SortParams';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams] = useSearchParams();

  const normalizePeople = (serverPeople: Person[]) => {
    return serverPeople.map(person => ({
      ...person,
      mother: serverPeople.find(p => p.name === person.motherName),
      father: serverPeople.find(p => p.name === person.fatherName),
    }));
  };

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(normalizePeople)
      .then(normalizedPeople => setPeople(normalizedPeople))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const handlePeople = () => {
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');
    const sex = searchParams.get('sex');
    const query = searchParams.get('query')?.trim().toLocaleLowerCase();
    const centuries = searchParams.getAll('centuries');
    let filteredPeople = [...people];

    if (query) {
      filteredPeople = filteredPeople
        .filter(person => person.name.toLowerCase()
          .includes(query)
          || person.motherName?.toLowerCase().includes(query)
          || person.fatherName?.toLowerCase().includes(query));
    }

    if (sex) {
      filteredPeople = filteredPeople.filter(person => person.sex === sex);
    }

    if (centuries && centuries.length > 0) {
      filteredPeople = filteredPeople
        .filter(person => centuries.includes(
          Math.ceil(person.born / 100).toString(),
        ));
    }

    if (sort) {
      switch (sort) {
        case SortParams.Name:
        case SortParams.Sex:
          filteredPeople.sort((a, b) => a[sort].localeCompare(b[sort]));
          break;

        case SortParams.Born:
        case SortParams.Died:
          filteredPeople.sort((a, b) => a[sort] - b[sort]);
          break;

        default:
      }
    }

    if (order) {
      filteredPeople.reverse();
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

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!people.length && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {(!handlePeople().length && !isLoading) && (
                <p>There are no people matching the current search criteria</p>
              )}

              {
                !!handlePeople().length
                && <PeopleTable people={handlePeople()} />
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
