import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { getPeople } from '../../api';
import { PeopleTable } from '../../components/PeopleTable';
import { PeopleFilters } from '../../components/PeopleFilters';
import { FilteringPeople } from '../../utils/filteringPeople';
import { Person } from '../../types';
import { SortingPeople } from '../../utils/sortingPeople';
import { SortOptions } from '../../types/SortOptions';
import { SortDirections } from '../../types/SortDirections';

export const People: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';
  const sort = (searchParams.get('sort') || '') as SortOptions;
  const order = (searchParams.get('order') || '') as SortDirections;

  const setPreparedData = (data: Person[]) => {
    const prepared = data.map(person => {
      return {
        ...person,
        mother: data.find(obj => obj.name === person.motherName),
        father: data.find(obj => obj.name === person.fatherName),
      };
    });

    setPeople(prepared);
  };

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPreparedData)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredPeople = useMemo(() => {
    return FilteringPeople(people, query, sex, centuries);
  }, [people, query, sex, centuries]);

  const sortedPeople = useMemo(() => {
    return SortingPeople(filteredPeople, sort, order);
  }, [filteredPeople, sort, order]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!!people.length && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && !isError && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!!people.length && (
                <PeopleTable people={sortedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
