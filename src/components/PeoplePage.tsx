import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { useMemo, useState } from 'react';
import { useEffect } from 'react';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [loading, setLoading] = useState(false);
  const [persons, setPersons] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(personsFromServer => setPersons(personsFromServer))
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  const preparedPeople = useMemo(() => {
    const lowerQuery = query.toLowerCase().trim();

    const isQueryIncluded = (person: Person) =>
      person.name.toLowerCase().includes(lowerQuery) ||
      person.fatherName?.toLowerCase().includes(lowerQuery) ||
      person.motherName?.toLowerCase().includes(lowerQuery);

    const isBornInCentury = (person: Person) =>
      centuries.length === 0 ||
      centuries.includes(Math.ceil(person.born / 100).toString());

    const getComparator = (sortBy: string) => {
      switch (sortBy) {
        case 'name':
          return (a: Person, b: Person) => a.name.localeCompare(b.name);
        case 'sex':
          return (a: Person, b: Person) => a.sex.localeCompare(b.sex);
        case 'born':
          return (a: Person, b: Person) => a.born - b.born;
        case 'died':
          return (a: Person, b: Person) => a.died - b.died;
        default:
          return undefined;
      }
    };

    const comparator = getComparator(sort);

    const filtered = persons.filter(
      person =>
        (!sex || person.sex === sex) &&
        isQueryIncluded(person) &&
        isBornInCentury(person),
    );

    if (!comparator) {
      return filtered;
    }

    const sorted = [...filtered].sort(comparator);

    return order === 'desc' ? sorted.reverse() : sorted;
  }, [persons, query, sex, centuries, sort, order]);

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

              {errorMessage && (
                <p data-cy="peopleLoadingError">{errorMessage}</p>
              )}

              {!loading && !errorMessage && persons.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading && !errorMessage && preparedPeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!loading && persons.length > 0 && preparedPeople.length > 0 && (
                <PeopleTable persons={preparedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
