import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { selectedPerson } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(() => setError('Something went wrong while fetching the data.'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      {isLoading && <Loader />}

      {error && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {!people.length && !isLoading && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      {people.length > 0 && !isLoading && !error && (
        <PeopleTable people={people} selectedPerson={selectedPerson || null} />
      )}
    </>
  );
};
