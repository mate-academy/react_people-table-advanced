import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable';
import { PeopleFilters } from '../PeopleFilters/PeopleFilters';
import { useSearchParams } from 'react-router-dom';
import { filterPeople, sortPeople } from '../../utils/peopleHelper';

export const PeoplePage: React.FC = () => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');

  const isEmpty = !isLoading && !isError && peopleList.length === 0;

  const filteredPeople = filterPeople(peopleList, sex, query, centuries);
  const visiblePeople = sortPeople(filteredPeople, sort, order);

  useEffect(() => {
    getPeople()
      .then(setPeopleList)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !isError && peopleList.length > 0 && (
              <PeopleFilters />
            )}
          </div>
          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isEmpty && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !isError && peopleList.length > 0 && (
                <PeopleTable people={visiblePeople} allPeople={peopleList} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
