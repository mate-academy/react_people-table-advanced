import { useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

import { Person } from '../types/Person';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      try {
        const response = await fetch(
          'https://mate-academy.github.io/react_people-table/api/people.json',
        );

        if (!response.ok) {
          setError('Something went wrong');

          return;
        }

        const data = await response.json();

        setPeople(data);
      } catch (err) {
        setError('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="box table-container">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        {error}
      </p>
    );
  }

  if (!people.length) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  return (
    <div className="container">
      <h1 className="title">People Page</h1>
      {!people.length && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}
      {people.length && (
        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
            <div className="column">
              <div className="box table-container">
                <PeopleTable people={people} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

