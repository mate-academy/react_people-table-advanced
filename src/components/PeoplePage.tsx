import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const visible = people.filter(person => {
    if (sex && person.sex !== sex) {
      return false;
    }

    const century = Math.ceil(person.born / 100).toString();

    if (centuries.length > 0 && !centuries.includes(century)) {
      return false;
    }

    const normalizedQuery = query.toLowerCase();

    if (
      query &&
      !person.name.toLowerCase().includes(normalizedQuery) &&
      !person.motherName?.toLowerCase().includes(normalizedQuery) &&
      !person.fatherName?.toLowerCase().includes(normalizedQuery)
    ) {
      return false;
    }

    return true;
  });

  const sortedPeople = [...visible].sort((a, b) => {
    let result = 0;

    switch (sort) {
      case 'name':
      case 'sex':
        result = a[sort].localeCompare(b[sort]);
        break;

      case 'born':
      case 'died':
        result = a[sort] - b[sort];
        break;

      default:
        return 0;
    }

    return order === 'desc' ? -result : result;
  });

  useEffect(() => {
    getPeople()
      .then(peopleFromServer => {
        const preparedPeople = peopleFromServer.map(person => ({
          ...person,
          mother: peopleFromServer.find(
            mother => mother.name === person.motherName,
          ),
          father: peopleFromServer.find(
            father => father.name === person.fatherName,
          ),
        }));

        setPeople(preparedPeople);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const isLoaded = !isLoading && !hasError;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {isLoaded && people.length > 0 && (
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

              {isLoaded && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isLoaded && people.length > 0 && visible.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {isLoaded && visible.length > 0 && (
                <PeopleTable people={sortedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
