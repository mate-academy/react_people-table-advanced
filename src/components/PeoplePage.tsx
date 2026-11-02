
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Person } from '../types/Person';
import { getPeople } from '../api';

import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [selectedPerson, setSelectedPerson] =
    useState<Person | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || 'asc';


  useEffect(() => {
    setIsLoading(true);
    setErrorMessage('');

    getPeople()
      .then(setPeople)
      .catch(() => {
        setErrorMessage('Unable to load people');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);


  const handleSort = (field: string) => {
    const params = new URLSearchParams(searchParams);

    if (sort === field && order === 'desc') {
      params.delete('sort');
      params.delete('order');
    } else if (sort === field) {
      params.set('order', 'desc');
    } else {
      params.set('sort', field);
      params.set('order', 'asc');
    }

    setSearchParams(params);
  };


  const sortedPeople = [...people].sort((a, b) => {
    if (!sort) {
      return 0;
    }

    const first = a[sort as keyof Person];
    const second = b[sort as keyof Person];


    if (first === undefined || second === undefined) {
      return 0;
    }


    if (
      typeof first === 'string' &&
      typeof second === 'string'
    ) {
      const result = first.localeCompare(second);

      return order === 'desc'
        ? -result
        : result;
    }


    if (
      typeof first === 'number' &&
      typeof second === 'number'
    ) {
      return order === 'desc'
        ? second - first
        : first - second;
    }


    return 0;
  });


  if (isLoading) {
    return <Loader />;
  }


  return (
    <>
      <h1 className="title">
        People
      </h1>


      <PeopleFilters />


      {errorMessage && (
        <p className="notification is-danger">
          {errorMessage}
        </p>
      )}


      {!errorMessage && people.length === 0 && (
        <p className="notification">
          No people found
        </p>
      )}


      {people.length > 0 && (
        <PeopleTable
          people={sortedPeople}
          selectedPerson={selectedPerson}
          onSelectPerson={setSelectedPerson}
          sort={sort}
          order={order}
          onSort={handleSort}
        />
      )}
    </>
  );
};
