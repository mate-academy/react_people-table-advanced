import React, { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';
import { getFilteredPeople } from '../utils/getFilteredPeople';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const peopleWithParents = people.reduce((newPeople: Person[], person) => {
    const mother = people.find(mama => mama.name === person.motherName);
    const father = people.find(papa => papa.name === person.fatherName);

    const updatedPerson = {
      ...person,
      mother,
      father,
    };

    newPeople.push(updatedPerson);

    return newPeople;
  }, []);

  const filteredAndSortedPeople = getFilteredPeople(peopleWithParents, {
    sex,
    query,
    centuries,
    sort,
    order,
  });

  useEffect(() => {
    const fetchPeople = async () => {
      setIsLoading(true);
      setError(false);

      try {
        const fetchedPeople = await getPeople();

        setPeople(fetchedPeople);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        {isLoading && <Loader />}
        {!isLoading && error && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}
        {!isLoading && people.length === 0 && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}
        {!isLoading && people.length > 0 && (
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>

            <div className="column">
              <div className="box table-container">
                <PeopleTable people={filteredAndSortedPeople} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
