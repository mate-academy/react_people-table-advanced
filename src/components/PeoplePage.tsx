import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';
  const search = searchParams.get('query') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  function comparePeopleFields(person1: Person, person2: Person) {
    switch (sort) {
      case 'name':
        return !order
          ? person1.name.localeCompare(person2.name)
          : person2.name.localeCompare(person1.name);
      case 'sex':
        return !order
          ? person1.sex.localeCompare(person2.sex)
          : person2.sex.localeCompare(person1.sex);
      case 'born':
        return !order
          ? person1.born - person2.born
          : person2.born - person1.born;
      case 'died':
        return !order
          ? person1.died - person2.died
          : person2.died - person1.died;
      default:
        return 0;
    }
  }

  const peopleWithParents = people.map(person => ({
    ...person,
    father: people.find(father => father.name === person.fatherName),
    mother: people.find(mother => mother.name === person.motherName),
  }));

  const visiblePeople = peopleWithParents
    .filter(person => {
      const searchToLowerCase = search.toLocaleLowerCase().trim();

      return (
        person.name.toLocaleLowerCase().includes(searchToLowerCase) ||
        person.fatherName?.toLocaleLowerCase().includes(searchToLowerCase) ||
        person.motherName?.toLocaleLowerCase().includes(searchToLowerCase)
      );
    })
    .filter(p => {
      const personCentury = Math.floor(p.born / 100) + 1;

      return centuries.length === 0 || centuries.includes(`${personCentury}`);
    })
    .filter(p => sex === '' || p.sex === sex)
    .sort((p1, p2) => comparePeopleFields(p1, p2));

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        setLoading(true);
        setPeople(await getPeople());
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && !error && people.length !== 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {!loading && error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!loading && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading && !error && visiblePeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!loading && !error && visiblePeople.length !== 0 && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
