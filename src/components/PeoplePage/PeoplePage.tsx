import { Loader } from '../Loader';
import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { PeopleFilters } from '../PeopleFilters/PeopleFilters';
import { useSearchParams } from 'react-router-dom';

const preparePersonRelations = (people: Person[]): Person[] => {
  return people.map(person => {
    const mother = people.find(p => p.name === person.motherName);
    const father = people.find(p => p.name === person.fatherName);

    return {
      ...person,
      mother,
      father,
    };
  });
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(receivedPeople => {
        const updatedPeople = preparePersonRelations(receivedPeople);

        setPeople(updatedPeople);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const canRenderPeople = people.length > 0 && !isLoading && !isError;
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') as string | null;
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') as string | null;

  const normalizedQuery = query.toLowerCase();

  const getPersonCentury = (born: number) => Math.ceil(born / 100).toString();

  const visiblePeople = people.filter(person => {
    const matchesSex = !sex || person.sex === sex;

    const matchesQuery =
      !query ||
      person.name.toLowerCase().includes(normalizedQuery) ||
      person.motherName?.toLowerCase().includes(normalizedQuery) ||
      person.fatherName?.toLowerCase().includes(normalizedQuery);

    const matchesCentury =
      !centuries.length || centuries.includes(getPersonCentury(person.born));

    return matchesSex && matchesQuery && matchesCentury;
  });

  const sortedPeople = [...visiblePeople].sort((a, b) => {
    if (!sort) {
      return 0;
    }

    const aValue = a[sort as keyof Person];
    const bValue = b[sort as keyof Person];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return order === 'desc'
        ? bValue.localeCompare(aValue)
        : aValue.localeCompare(bValue);
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return order === 'desc' ? bValue - aValue : aValue - bValue;
    }

    return 0;
  });

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {canRenderPeople && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {canRenderPeople && <PeopleTable people={sortedPeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
