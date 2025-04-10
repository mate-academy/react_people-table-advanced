import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';
import { useSearchParams } from 'react-router-dom';
import { getFilteredPeople } from '../utils/getFilteredPeople';

export const PersonPage = () => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query')?.toLowerCase() || '';
  const centuries = searchParams.getAll('centuries').map(Number);
  const sex = searchParams.get('sex');

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(peopleFromServer => {
        setPeople(peopleFromServer);
      })
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const peopleWithParents = people.map(person => {
    const mother = people.find(m => m.name === person.motherName);
    const father = people.find(f => f.name === person.fatherName);

    return {
      ...person,
      ...(mother && { mother }),
      ...(father && { father }),
    };
  });

  const filteredPeople = getFilteredPeople(peopleWithParents, {
    query,
    centuries,
    sex,
  });

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              {!isLoading && <PeopleFilters />}
            </div>

            <div className="column">
              <div className="box table-container">
                {isLoading ? (
                  <Loader />
                ) : errorMessage ? (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    {errorMessage}
                  </p>
                ) : !people.length ? (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                ) : (
                  <PeopleTable people={filteredPeople} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
