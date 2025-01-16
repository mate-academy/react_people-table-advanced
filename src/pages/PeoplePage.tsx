import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';
import { getFilteredPeople } from '../utils/getFilteredPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const filteredAndSortedPeople = getFilteredPeople(people, {
    sex,
    query,
    centuries,
    sort,
    order,
  });

  const fetchPeople = async () => {
    setIsLoading(true);
    try {
      const peopleData = await getPeople();

      const modifiedPeopleData = peopleData.map(person => ({
        ...person,
        mother: peopleData.find(p => p.name === person.motherName),
        father: peopleData.find(p => p.name === person.fatherName),
      }));

      setPeople(modifiedPeopleData);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {people.length > 0 && (
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

              {!people.length && !isLoading && !isError && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!filteredAndSortedPeople.length && !isLoading && (
                <p>There are no people matching the current search criteria</p>
              )}

              {filteredAndSortedPeople.length > 0 && (
                <PeopleTable people={filteredAndSortedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
