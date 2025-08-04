import { Loader } from './Loader';
import { useEffect, useMemo, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [searchParams] = useSearchParams();

  const fetchPeople = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await getPeople();

      setPeople(data);
    } catch {
      setError('Failed to get people');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const query = (searchParams.get('query') || '').toLowerCase();
  const centuries = searchParams.getAll('centuries');
  const gender = searchParams.get('sex') || '';

  const sortField = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  const filteredPeople = people?.filter(person => {
    const matchesQuery =
      !query ||
      [person.name, person.motherName, person.fatherName].some(field =>
        field?.toLowerCase().includes(query),
      );

    const matchesCentury =
      centuries.length === 0 ||
      centuries.includes((Math.floor((person.born - 1) / 100) + 1).toString());

    const matchesGender = !gender || person.sex === gender;

    return matchesQuery && matchesCentury && matchesGender;
  });

  const sortedPeople = useMemo(() => {
    if (!filteredPeople || !sortField) {
      return filteredPeople;
    }

    const sorted = [...filteredPeople].sort((a, b) => {
      let valA = a[sortField as keyof Person];
      let valB = b[sortField as keyof Person];

      if (valA == null) {
        return 1;
      }

      if (valB == null) {
        return -1;
      }

      if (typeof valA === 'string' && typeof valB === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }

      if (valA > valB) {
        return 1;
      }

      if (valA < valB) {
        return -1;
      }

      return 0;
    });

    if (sortOrder === 'desc') {
      sorted.reverse();
    }

    return sorted;
  }, [filteredPeople, sortField, sortOrder]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        {loading ? (
          <Loader />
        ) : error ? (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        ) : people?.length === 0 ? (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        ) : (
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>

            <div className="column">
              <div className="box table-container">
                <PeopleTable people={sortedPeople || []} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
