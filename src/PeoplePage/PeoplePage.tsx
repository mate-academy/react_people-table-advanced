import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { Person } from '../types/Person';
import { PeopleFilters } from '../PeopleFilter/PeopleFilter';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    getPeople()
      .then(data => {
        setPeople(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
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

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const filteredPeople = people.filter(person => {
    const matchesName = (name: string) =>
      name.toLowerCase().includes(query.toLowerCase());
    const century = Math.floor((person.born + 99) / 100);

    return (
      (query === '' ||
        matchesName(person.name) ||
        matchesName(person.motherName || '') ||
        matchesName(person.fatherName || '')) &&
      (sex === '' || person.sex === sex) &&
      (centuries.length === 0 || centuries.includes(century.toString()))
    );
  });

  return (
    <div className="section">
      <h1 className="title">People Page</h1>
      <PeopleFilters />
      {people.length === 0 ? (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      ) : (
        <PeopleTable people={filteredPeople} selectedSlug={slug} />
      )}
    </div>
  );
};
