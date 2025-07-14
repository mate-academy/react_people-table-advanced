import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { useEffect, useMemo, useState } from 'react';
import { getPeople } from '../api';
import { useParams, useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setError('Failed to fetch people'))
      .finally(() => setIsLoading(false));
  }, []);

  const sortedAndFilteredPeople = useMemo(() => {
    const sex = searchParams.get('sex');
    const query = searchParams.get('query')?.toLowerCase() || '';
    const centuries = searchParams.getAll('centuries');
    const sortField = searchParams.get('sort') as keyof Person | null;
    const order = searchParams.get('order');

    const filtered = people.filter(person => {
      const matchesSex = sex ? person.sex === sex : true;

      let matchesQuery = true;

      if (query) {
        const lowerQuery = query.toLowerCase();

        const motherMatches =
          person.motherName?.toLowerCase().includes(lowerQuery) ?? false;
        const nameMatches = person.name.toLowerCase().includes(lowerQuery);
        const fatherMatches =
          person.fatherName?.toLowerCase().includes(lowerQuery) ?? false;

        matchesQuery = motherMatches || nameMatches || fatherMatches;
      }

      const century = Math.ceil(person.born / 100).toString();
      const matchesCentury =
        centuries.length > 0 ? centuries.includes(century) : true;

      return matchesSex && matchesQuery && matchesCentury;
    });

    if (!sortField) {
      return filtered;
    }

    const sorted = [...filtered];

    sorted.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();

        if (aVal < bVal) {
          return order === 'desc' ? 1 : -1;
        }

        if (aVal > bVal) {
          return order === 'desc' ? -1 : 1;
        }

        return 0;
      }

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return order === 'desc' ? bVal - aVal : aVal - bVal;
      }

      return 0;
    });

    return sorted;
  }, [people, searchParams]);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        {isLoading ? (
          <div className="has-text-centered" data-cy="peopleLoading">
            <Loader />
          </div>
        ) : (
          <div className="block">
            <div className="columns is-desktop is-flex-direction-row-reverse">
              <div className="column is-7-tablet is-narrow-desktop">
                <PeopleFilters />
              </div>

              <div className="column">
                <div className="box table-container">
                  {error && (
                    <p data-cy="peopleLoadingError" className="has-text-danger">
                      {error}
                    </p>
                  )}

                  {sortedAndFilteredPeople!.length === 0 ? (
                    <p data-cy="noPeopleMessage">
                      There are no people with these filters
                    </p>
                  ) : (
                    <PeopleTable
                      people={sortedAndFilteredPeople}
                      allPeople={people}
                      selectedSlug={slug}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
