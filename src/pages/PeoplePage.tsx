import * as React from 'react';
import { useEffect, useState } from 'react';
import { Person } from '../types/Person';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);
    setError(false);

    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  if (people.length === 0) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  const sex = searchParams.get('sex');
  const query = searchParams.get('query')?.toLowerCase() || '';
  const centuries = searchParams.getAll('centuries');

  let visiblePeople = [...people];

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (query) {
    visiblePeople = visiblePeople.filter(
      person =>
        person.name.toLowerCase().includes(query) ||
        person.motherName?.toLowerCase().includes(query) ||
        person.fatherName?.toLowerCase().includes(query),
    );
  }

  if (centuries.length > 0) {
    visiblePeople = visiblePeople.filter(person => {
      const century = Math.ceil(person.born / 100);

      return centuries.includes(String(century));
    });
  }

  const sortField = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  if (sortField) {
    visiblePeople.sort((a, b) => {
      let aValue: string | number = '';
      let bValue: string | number = '';

      switch (sortField) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'sex':
          aValue = a.sex;
          bValue = b.sex;
          break;
        case 'born':
          aValue = a.born;
          bValue = b.born;
          break;
        case 'died':
          aValue = a.died;
          bValue = b.died;
          break;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'desc'
          ? bValue.localeCompare(aValue)
          : aValue.localeCompare(bValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
      }

      return 0;
    });
  }

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="columns is-desktop is-flex-direction-row-reverse">
        <div className="column is-7-tablet is-narrow-desktop">
          <PeopleFilters />
        </div>
        <div className="column">
          <PeopleTable people={visiblePeople} />
        </div>
      </div>
    </>
  );
};
