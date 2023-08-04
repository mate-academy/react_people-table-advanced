import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getPeople } from '../api';

import { Person } from '../types/Person';

import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';
import { Sort } from '../types/Sort';

export const People: React.FC = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const filteredPeople = useMemo(() => {
    return people
      ?.filter(person => (
        person.name.toLowerCase().includes(query)
          || person.motherName?.toLowerCase().includes(query)
          || person.fatherName?.toLowerCase().includes(query)
      ))
      .filter(person => (
        !sex || person.sex === sex
      ))
      .filter(person => (
        !centuries.length || centuries.some(century => (
          +century === Math.ceil(person.born / 100)
        ))
      )) || null;
  }, [query, sex, centuries]);

  const sortedPeople = useMemo(() => {
    if (sort === '') {
      return filteredPeople || null;
    }

    const sorted = filteredPeople?.sort((person1, person2) => {
      switch (sort) {
        case Sort.Name:
        case Sort.Sex:
          return person1[sort].localeCompare(person2[sort]);

        case Sort.Born:
        case Sort.Died:
          return person1[sort] - person2[sort];

        default:
          return 0;
      }
    }) || null;

    return (order === 'desc' && sorted) ? sorted.reverse() : sorted;
  }, [sort, order, filteredPeople]);

  const handleNewParamValue = (searchParamName: string, newValue: string) => {
    const params = new URLSearchParams(searchParams);

    if (!newValue) {
      params.delete(searchParamName);
    } else {
      params.set(searchParamName, newValue);
    }

    setSearchParams(params);
  };

  const returnXML = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (isError) {
      return (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      );
    }

    if (!people?.length) {
      return (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      );
    }

    if (!filteredPeople?.length) {
      return (
        <p>
          There are no people matching the current search criteria
        </p>
      );
    }

    return (
      <PeopleTable
        people={sortedPeople}
        sort={sort}
        order={order}
      />
    );
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              query={query}
              sex={sex}
              centuries={centuries}
              handleNewParamValue={handleNewParamValue}
            />
          </div>

          <div className="column">
            <div className="box table-container">
              {returnXML()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
