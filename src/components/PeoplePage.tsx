import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from './Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';

export enum SortingOptions {
  name = 'name',
  nameRev = 'nameRev',
  sex = 'sex',
  sexRev = 'sexRev',
  born = 'born',
  bornRev = 'bornRev',
  died = 'died',
  diedRev = 'diedRev',
}

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [searchParams] = useSearchParams();

  const filteredByQuery = searchParams.get('query') || '';
  const filteredBySex = searchParams.get('sex') || '';
  const filteredByCenturies = searchParams.getAll('centuries');
  const sortedBy = searchParams.get('sortedBy') || '';

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(allPeople => {
        const preparedPeople = allPeople.map(person => ({
          ...person,
          mother: allPeople.find(mother => mother.name === person.motherName),
          father: allPeople.find(father => father.name === person.fatherName),
        }));

        setPeople(preparedPeople);
      })
      .catch(() => {
        setError('Something went wrong');
      })
      .finally(() => setLoading(false));
  }, []);

  const getPreparedPeople = (allPeople: Person[]) => {
    let visiblePeople = [...allPeople];

    if (filteredByQuery) {
      const preparedQuery = filteredByQuery.toLowerCase().trim();

      visiblePeople = visiblePeople.filter(
        person =>
          person.name.toLowerCase().includes(preparedQuery) ||
          person.motherName?.toLowerCase().includes(preparedQuery) ||
          person.fatherName?.toLowerCase().includes(preparedQuery),
      );
    }

    if (filteredByCenturies.length) {
      visiblePeople = visiblePeople.filter(person =>
        filteredByCenturies.includes(Math.ceil(person.born / 100).toString()),
      );
    }

    if (filteredBySex) {
      visiblePeople = visiblePeople.filter(
        person => person.sex === filteredBySex,
      );
    }

    if (sortedBy) {
      visiblePeople.sort((a, b) => {
        switch (sortedBy) {
          case SortingOptions.name:
            return a.name.localeCompare(b.name);

          case SortingOptions.sex:
            return a.sex.localeCompare(b.sex);

          case SortingOptions.nameRev:
            return b.name.localeCompare(a.name);

          case SortingOptions.sexRev:
            return b.sex.localeCompare(a.sex);

          case SortingOptions.born:
            return a.born - b.born;

          case SortingOptions.died:
            return a.died - b.died;

          case SortingOptions.bornRev:
            return b.born - a.born;

          case SortingOptions.diedRev:
            return b.died - a.died;

          default:
            return 0;
        }
      });
    }

    return visiblePeople;
  };

  const preparedPeople = getPreparedPeople(people);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {!loading && error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {error}
                </p>
              )}

              {!loading && !error && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading && !error && !preparedPeople.length && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!loading && !error && !!preparedPeople.length && (
                <PeopleTable
                  preparedPeople={preparedPeople}
                  sortedBy={sortedBy}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
