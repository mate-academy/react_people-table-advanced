import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [peopleData, setPeopleData] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const preparedPeopleData = peopleData.map(person => ({
    ...person,
    mother: peopleData.find(mother => mother.name === person.motherName),
    father: peopleData.find(father => father.name === person.fatherName),
  }));

  useEffect(() => {
    getPeople()
      .then(people => {
        setPeopleData(people);
        setIsLoading(false);
      })
      .catch(() => {
        setHasError(true);
        setIsLoading(false);
      });
  }, []);

  const dataExists = !isLoading && !hasError && peopleData.length > 0;
  const noPeopleData = peopleData.length === 0;
  const showNoPeopleMessage = !isLoading && !hasError && noPeopleData;

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
              {isLoading && <Loader />}

              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}
              {showNoPeopleMessage && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              <p>There are no people matching the current search criteria</p>

              {dataExists && (
                <PeopleTable
                  isLoading={isLoading}
                  dataExists={dataExists}
                  preparedPeopleData={preparedPeopleData}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
