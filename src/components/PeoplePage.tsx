import React, { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { Loader } from '../components/Loader';
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

export const PeoplePage: React.FC = () => {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [people, setPeople] = useState<Person[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const filter =
    (searchParams.get('filter') as 'all' | 'male' | 'female') || 'all';
  const centuryQuery: string[] = searchParams.getAll('century') || [];
  const searchQuery = searchParams.get('search') || '';
  const sortField = searchParams.get('sort') as
    | 'name'
    | 'sex'
    | 'born'
    | 'died';
  const sortOrder = searchParams.get('order') as 'asc' | 'desc' | null;

  useEffect(() => {
    const fetchPeople = async () => {
      setLoader(true);
      try {
        const data = await getPeople();

        setPeople(data);
      } catch (er) {
        setError('Something went wrong');
      } finally {
        setLoader(false);
      }
    };

    fetchPeople();
  }, []);

  const filteredAndSortedPeople = useMemo(() => {
    let updatedPeople = [...people];

    const getCentury = (year: number) => Math.floor((year - 1) / 100) + 1;

    if (centuryQuery.length > 0) {
      updatedPeople = updatedPeople.filter(person =>
        centuryQuery.includes(getCentury(person.born).toString()),
      );
    }

    if (filter === 'male') {
      updatedPeople = updatedPeople.filter(person => person.sex === 'm');
    } else if (filter === 'female') {
      updatedPeople = updatedPeople.filter(person => person.sex === 'f');
    }

    if (searchQuery) {
      updatedPeople = updatedPeople.filter(
        person =>
          person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          person.motherName
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          person.fatherName?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (sortField) {
      updatedPeople.sort((a, b) => {
        let comparison = 0;

        if (sortField === 'name') {
          comparison = a.name.localeCompare(b.name);
        } else if (sortField === 'sex') {
          comparison = a.sex.localeCompare(b.sex);
        } else if (sortField === 'born') {
          comparison = a.born - b.born;
        } else if (sortField === 'died') {
          comparison = a.died - b.died;
        }

        return sortOrder === 'desc' ? -comparison : comparison;
      });
    }

    return updatedPeople;
  }, [people, filter, centuryQuery, searchQuery, sortField, sortOrder]);

  const handleFilterGender = (filterGender: 'all' | 'male' | 'female') => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (filterGender === 'all') {
      newSearchParams.delete('filter');
    } else {
      newSearchParams.set('filter', filterGender);
    }

    setSearchParams(newSearchParams);
  };

  const handleSelectedCentury = (century: string | 'all' | null) => {
    if (century === 'all' || century === null) {
      const params = new URLSearchParams(searchParams);

      params.delete('century');
      setSearchParams(params);

      return;
    }

    const isSelected = centuryQuery.includes(century);
    const updatedCenturies = isSelected
      ? centuryQuery.filter(item => item !== century)
      : [...centuryQuery, century];

    const params = new URLSearchParams(searchParams);

    params.delete('century');
    updatedCenturies.forEach(cent => params.append('century', cent.toString()));

    setSearchParams(params);
  };

  const handleSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (query) {
      newSearchParams.set('search', query);
    } else {
      newSearchParams.delete('search');
    }

    setSearchParams(newSearchParams);
  };

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        {people.length > 0 ? (
          <PeopleTable
            persons={filteredAndSortedPeople}
            sortField={sortField}
            sortOrder={sortOrder}
          />
        ) : (
          <p>There are no people matching the current search criteria</p>
        )}
      </div>
      <div className="block">
        {loader && !error ? (
          <Loader />
        ) : error ? (
          <p data-cy="peopleLoadingError">Something went wrong</p>
        ) : people.length > 0 ? (
          <PeopleFilters
            persons={people}
            onFilterChange={handleFilterGender}
            onChange={handleSearchQuery}
            onClick={handleSelectedCentury}
          />
        ) : (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}
      </div>
    </>
  );
};
