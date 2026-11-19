import { useEffect, useState } from 'react';
import { PeopleTable } from '../PeopleTable';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { PeopleFilters } from '../PeopleFilters';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../../types/Person';
import { Field } from '../../types/Field';
import { Order } from '../../types/Order';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const normalizedQuery = query.toLowerCase();

  useEffect(() => {
    getPeople()
      .then(loaded => {
        setPeople(
          loaded.map(person => ({
            ...person,
            mother: loaded.find(p => p.name === person.motherName),
            father: loaded.find(p => p.name === person.fatherName),
          })),
        );
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const visiblePeople = people.filter(person => {
    const personCentury = Math.ceil(person.born / 100);

    const matchesSex = !sex || person.sex === sex;

    const matchesQuery = [
      person.name,
      person.fatherName,
      person.motherName,
    ].some(field => field?.toLowerCase().includes(normalizedQuery));

    const matchesCentury =
      centuries.length === 0 || centuries.includes(String(personCentury));

    return matchesSex && matchesCentury && matchesQuery;
  });

  const sortedPeople = [...visiblePeople].sort((person1, person2) => {
    switch (sort) {
      case Field.NAME:
        return person1.name.localeCompare(person2.name);
      case Field.SEX:
        return person1.sex.localeCompare(person2.sex);
      case Field.BORN:
        return person1.born - person2.born;
      case Field.DIED:
        return person1.died - person2.died;
      default:
        return 0;
    }
  });

  if (order === Order.DESC) {
    sortedPeople.reverse();
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && !hasError && people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && !hasError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !hasError && people.length > 0 && (
                <PeopleTable people={sortedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
