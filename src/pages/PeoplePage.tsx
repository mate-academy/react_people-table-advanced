import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

import { Person } from '../types';
import { getPeople } from '../api';
import { usePeople } from '../store/PeopleContext';
import { preparedPeople } from '../utils/preparedPeople';

const getPreparedPeople = (people: Person[]): Person[] => {
  return people.map(person => {
    return {
      ...person,
      mother: people.find(mother => mother.name === person.motherName),
      father: people.find(father => father.name === person.fatherName),
    };
  });
};

export const PeoplePage = () => {
  const { people, setPeople } = usePeople();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const peopleFromServer = await getPeople();

        setPeople(getPreparedPeople(peopleFromServer));
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const visiblePeople = preparedPeople(searchParams, people);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && (
                <Loader />
              )}

              {isError && !isLoading && (
                <p
                  data-cy="peopleLoadingError"
                  className="has-text-danger"
                >
                  Something went wrong
                </p>
              )}

              {!people?.length && !isLoading && !isError && (
                <p
                  data-cy="noPeopleMessage"
                >
                  There are no people on the server
                </p>
              )}

              {!!people?.length && !isError && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
