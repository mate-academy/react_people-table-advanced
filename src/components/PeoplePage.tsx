import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useSearchParams } from 'react-router-dom';

export const PeoplePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || 'asc';

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || '';

  interface Person {
    slug: string;
    name: string;
    sex: string;
    born: number;
    died: number;
    motherName: string | null;
    fatherName: string | null;
  }

  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await fetch(
          'https://mate-academy.github.io/react_people-table/api/people.json',
        );

        if (!response.ok) {
          throw new Error('Error');
        }

        const data = await response.json();

        setPeople(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filtredPeople = people.filter(person => {
    const toLower = query.toLowerCase();

    const matchesNames = person.name.toLowerCase().includes(toLower);
    const matchesSex = sex === '' || person.sex === sex;
    const personCentery = (Math.floor(person.born / 100) + 1).toString();
    const matchesCentury =
      centuries.length === 0 || centuries.includes(personCentery);
    const mother = (person.motherName || '').toLowerCase().includes(toLower);
    const father = (person.fatherName || '').toLowerCase().includes(toLower);

    return (matchesNames || mother || father) && matchesSex && matchesCentury;
  });

  const sortedPeople = [...filtredPeople].sort((personA, personB) => {
    if (!sort) {
      return 0;
    }

    const valA = personA[sort as keyof Person];
    const valB = personB[sort as keyof Person];

    let result = 0;

    if (typeof valA === 'number' && typeof valB === 'number') {
      result = valA - valB;
    } else if (typeof valA === 'string' && typeof valB === 'string') {
      result = valA.localeCompare(valB);
    }

    return order === 'desc' ? -result : result;
  });

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">
            <div className="columns is-desktop is-reversed-touch">
              <div className="column">
                {loading ? (
                  <Loader />
                ) : error ? (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    Something went wrong
                  </p>
                ) : people.length === 0 ? (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                ) : (
                  <Routes>
                    <Route
                      path="/"
                      element={<PeopleTable people={sortedPeople} />}
                    />
                    <Route
                      path=":slug"
                      element={<PeopleTable people={sortedPeople} />}
                    />
                  </Routes>
                )}
              </div>

              <div className="column is-7-tablet is-narrow-desktop">
                {!loading && !error && <PeopleFilters />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
