import { useEffect, useState } from 'react';
import { Person } from '../types/Person';
import { getPeople } from '../api';
import React from 'react';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';
import { useLocation } from 'react-router-dom';

const mappedPeople = (people: Person[]) => {
  return people.map(person => {
    const father = people.find(p => p.name === person.fatherName);
    const mother = people.find(p => p.name === person.motherName);

    return {
      ...person,
      father: father || undefined,
      mother: mother || undefined,
    };
  });
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
    setLoading(true);
    getPeople()
      .then(peopleFromServer => {
        setPeople(mappedPeople(peopleFromServer));
      })
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query')?.toLowerCase() || '';
  const centuries = searchParams.getAll('centuries').map(c => +c);
  const sexFilter = searchParams.get('sex');

  const filteredPeople = people.filter(person => {
    const matchesQuery =
      !query ||
      [person.name, person.fatherName, person.motherName].some(name =>
        name?.toLowerCase().includes(query),
      );

    const matchesSex = !sexFilter || person.sex === sexFilter;

    const personCentury = Math.ceil(person.born / 100);
    const matchesCentury =
      !centuries.length || centuries.includes(personCentury);

    return matchesQuery && matchesSex && matchesCentury;
  });

  return (
    <div className="container">
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}
          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}
              {error && !loading && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {error}
                </p>
              )}
              {!people.length && !error && !loading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {people.length > 0 && !error && !loading && (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
