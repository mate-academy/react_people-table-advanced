import { useEffect, useState, useMemo } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    getPeople()
      .then(res => setPeople(res))
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  const resolvedPeople = useMemo(() => {
    return people.map(person => {
      const mother = people.find(p => p.name === person.motherName);
      const father = people.find(p => p.name === person.fatherName);
      return { ...person, mother, father };
    });
  }, [people]);

  const nameFilter = searchParams.get('name') || '';
  const sexFilter = searchParams.get('sex') || '';
  const centuryFilter = searchParams.getAll('centuries').map(Number);

  const getCentury = (year: number) => Math.ceil(year / 100);

  const filteredPeople = useMemo(() => {
    return resolvedPeople.filter(p => {
      const query = nameFilter.toLowerCase();
      const nameMatch =
        p.name.toLowerCase().includes(query) ||
        p.motherName?.toLowerCase().includes(query) ||
        p.fatherName?.toLowerCase().includes(query);

      const personCentury = getCentury(p.born);
      const centuryMatch =
        centuryFilter.length === 0 || centuryFilter.includes(personCentury);

      const sexMatch = !sexFilter || p.sex === sexFilter;

      return nameMatch && centuryMatch && sexMatch;
    });
  }, [resolvedPeople, nameFilter, centuryFilter, sexFilter]);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}
          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}
              {error && <p data-cy="peopleLoadingError">{error}</p>}
              {!loading && filteredPeople.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people matching the current search criteria
                </p>
              )}
              {!loading && filteredPeople.length > 0 && (
                <PeopleTable people={filteredPeople} selectedSlug={slug} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
