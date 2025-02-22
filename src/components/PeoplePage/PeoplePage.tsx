import { PeopleFilters } from '../PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { useSearchParams } from 'react-router-dom';
import { filterPeople } from '../helpers/filterPeople';
import { sortPeople } from '../helpers/sortPeople';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';
  const sort = (searchParams.get('sort') || '') as keyof Person;
  const order = searchParams.get('order') || '';

  const preparedPeople = people.map(personValue => ({
    ...personValue,
    mother: people.find(human => human.name === personValue.motherName),
    father: people.find(human => human.name === personValue.fatherName),
  }));

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleFilter = () => {
    return filterPeople(query, centuries, sex, preparedPeople);
  };

  const handleSort = () => {
    const sortedPeople = handleFilter();

    if (sort) {
      return sortPeople(sort, order, sortedPeople);
    }

    return sortedPeople;
  };

  const sortedPeople = handleSort();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters handleFilter={handleFilter} />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {isError && (
                    <p data-cy="peopleLoadingError">Something went wrong</p>
                  )}

                  {!people.length && !isError && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}

                  {!!people.length && !isError && (
                    <PeopleTable preparedPeople={sortedPeople} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
