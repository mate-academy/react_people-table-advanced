import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';
import { fillteringPeople, sortPeople } from '../utils/functions';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [people, setPeople] = useState<Person[] | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchParams] = useSearchParams();

  const gender = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const filteredArray = fillteringPeople(people, gender, query, centuries);
  const sortedArray = sortPeople(filteredArray, sort, order);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then((data: Person[]) => {
        const fullData = data.map(dataItem => {
          const mother = data.find(item => item.name === dataItem.motherName);
          const father = data.find(item => item.name === dataItem.fatherName);

          return {
            ...dataItem,
            mother,
            father,
          };
        });

        setPeople(fullData);
      })
      .catch(() => {
        setErrorMessage('Something went wrong');
        setPeople(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        {isLoading && <Loader />}
        {errorMessage && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {errorMessage}
          </p>
        )}

        {people && !people?.length && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {people && (
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>

            <div className="column">
              <div className="box table-container">
                {!!filteredArray.length ? (
                  <PeopleTable people={sortedArray} />
                ) : (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
