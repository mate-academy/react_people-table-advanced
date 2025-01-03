import { useEffect, useState } from 'react';
import { getPeople } from '../api';

import { Person } from '../types';

import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';
import { filterPeople } from '../utils/filterPeople';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const [peoples, setPeoples] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const isTableVisible = !isLoading && !!peoples.length;
  const noPeopleText = !peoples.length && !error && !isLoading;
  const isLoaderVisible = isLoading && !error;

  useEffect(() => {
    setIsLoading(true);
    setError(false);
    getPeople()
      .then(setPeoples)
      .catch(() => {
        setError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const preparedPeople = peoples.map(person => {
    const father = peoples.find(parent => parent.name === person.fatherName);
    const mother = peoples.find(parent => parent.name === person.motherName);

    return { ...person, father, mother };
  });

  const filteredPeople = filterPeople({
    preparedPeople,
    query,
    sex,
    centuries,
    sort,
    order,
  });

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!!peoples.length && !isLoading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoaderVisible && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {error}
                </p>
              )}

              {noPeopleText && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isTableVisible ? (
                <PeopleTable people={filteredPeople} />
              ) : (
                <p>There are no people matching the current search criteria</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
