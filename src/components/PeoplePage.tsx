import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const [searchParams] = useSearchParams();

  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const filterPeople = () => {
    let visiblePeople = people;

    const filterSex = searchParams.get('sex');
    const filterQuery = searchParams.get('query')?.toLowerCase() || '';
    const filterCentury = searchParams.getAll('century') || [];

    if (filterSex) {
      visiblePeople = visiblePeople.filter(person => person.sex === filterSex);
    }

    if (filterQuery) {
      visiblePeople = visiblePeople.filter(
        person =>
          person.name.toLowerCase().includes(filterQuery) ||
          person.fatherName?.toLowerCase().includes(filterQuery) ||
          person.motherName?.toLowerCase().includes(filterQuery),
      );
    }

    if (filterCentury && filterCentury.length > 0) {
      visiblePeople = visiblePeople.filter(person =>
        filterCentury.includes(Math.ceil(person.born / 100).toString()),
      );
    }

    if (currentSort) {
      const sortOrder = currentOrder ? -1 : 1;

      if (currentSort === 'name' || currentSort === 'sex') {
        visiblePeople = visiblePeople.sort(
          (a: Person, b: Person) =>
            sortOrder * a[currentSort].localeCompare(b[currentSort]),
        );
      }

      if (currentSort === 'born' || currentSort === 'died') {
        visiblePeople = visiblePeople.sort(
          (a: Person, b: Person) =>
            sortOrder * (a[currentSort] - b[currentSort]),
        );
      }
    }

    return visiblePeople;
  };

  const filteredPeople = filterPeople();

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (error) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  return (
    <>
      <h1 className="title">People Page</h1>
      {(isLoading && <Loader />) || (
        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>

            <div className="column">
              <div className="box table-container">
                {people.length ? (
                  <PeopleTable people={filteredPeople} />
                ) : (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
