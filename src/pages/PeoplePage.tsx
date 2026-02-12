import React, { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleTable } from '../components/PeopleTable';
import { Loader } from '../components/Loader';
import { PeopleFilters } from '../components/PeopleFilters';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const selectedCenturies = searchParams.getAll('centuries');
  const sortField = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  const filteredByName = people.filter(person => {
    if (!query) {
      return true;
    }

    const q = query.toLowerCase();

    return (
      person.name.toLowerCase().includes(q) ||
      person.motherName?.toLowerCase().includes(q) ||
      person.fatherName?.toLowerCase().includes(q)
    );
  });

  const filteredPeople = filteredByName.filter(person => {
    if (selectedCenturies.length === 0) {
      return true;
    }

    const birthCentury = Math.floor(person.born / 100) + 1;

    return selectedCenturies.includes(birthCentury.toString());
  });

  const visiblePeople = [...filteredPeople];

  if (sortField) {
    visiblePeople.sort((a, b) => {
      const valueA = a[sortField as keyof Person];
      const valueB = b[sortField as keyof Person];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return valueA.localeCompare(valueB);
      }

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return valueA - valueB;
      }

      return 0;
    });

    if (sortOrder === 'desc') {
      visiblePeople.reverse();
    }
  }

  useEffect(() => {
    getPeople()
      .then(data => {
        setPeople(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load people');
        setLoading(false);
      });
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

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="columns">
        <div className="column">
          <PeopleTable people={visiblePeople} selectedSlug={slug} />
        </div>

        <div className="column is-one-quarter">
          <PeopleFilters />
        </div>
      </div>
    </>
  );
};
