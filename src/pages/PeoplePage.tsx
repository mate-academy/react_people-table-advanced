import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const normalizedPeople = people.map(person => ({
    ...person,
    mother: people.find(human => human.name === person.motherName),
    father: people.find(human => human.name === person.fatherName),
  }));

  const filterPeople = () => {
    let filteredPeople = [...normalizedPeople];

    if (query) {
      filteredPeople = filteredPeople.filter(person => {
        return person.name.toLowerCase().includes(query.toLowerCase())
        || person.fatherName?.toLowerCase().includes(query.toLowerCase())
        || person.motherName?.toLowerCase().includes(query.toLowerCase());
      });
    }

    if (sex) {
      filteredPeople = filteredPeople.filter(person => person.sex === sex);
    }

    if (centuries.length) {
      filteredPeople = filteredPeople.filter(person => {
        return centuries.includes(Math.ceil(person.born / 100).toString());
      });
    }

    return filteredPeople;
  };

  const preparedPeople = filterPeople();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && people.length !== 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && (preparedPeople.length > 0 ? (
                <PeopleTable people={preparedPeople} />
              ) : (
                <p data-cy="noPeopleMessage">
                  There are no people matching the current search criteria
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
