import { useEffect, useState } from 'react';

import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);

  const fetchPeoples = async () => {
    try {
      setIsError(false);
      const data: Person[] = await getPeople();

      if (!data) {
        throw new Error('false get');
      }

      const peopleWithParents = data.map((person: Person) => {
        const updatedPerson = { ...person };

        data.forEach(parent => {
          if (parent.name === person.fatherName) {
            updatedPerson.father = parent;
          }

          if (parent.name === person.motherName) {
            updatedPerson.mother = parent;
          }
        });

        return updatedPerson;
      });

      setPeopleList(peopleWithParents);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPeoples();
  }, []);

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
              {isLoading && !isError && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}
              {!isError && !isLoading && peopleList.length < 1 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {!isError && !isLoading && peopleList.length > 0 && (
                <PeopleTable peopleList={peopleList} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
