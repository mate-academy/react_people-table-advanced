import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleFilters } from '../PeopleFilters';
import { PeopleTable } from '../PeopleTable';
import { getPersonCentury } from '../../utils/getPersonCentury';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [people, setPeople] = useState<Person[]>([]);
  const { slug } = useParams<{ slug?: string }>();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';

  const filteredPeople = useMemo(
    () =>
      people.filter(person => {
        const lowerQuery = query.toLowerCase();
        const matchesQuery =
          person.name.toLowerCase().includes(lowerQuery) ||
          (person.motherName || '').toLowerCase().includes(lowerQuery) ||
          (person.fatherName || '').toLowerCase().includes(lowerQuery);

        const matchesSex = sex ? person.sex === sex : true;

        const matchesCentury = centuries.length
          ? centuries.includes(getPersonCentury(person.born).toString())
          : true;

        return matchesQuery && matchesSex && matchesCentury;
      }),
    [query, sex, people, centuries],
  );

  useEffect(() => {
    const fetchPeople = async () => {
      setIsLoading(true);
      try {
        const result = await getPeople();

        setPeople(result);
        setError(null);
      } catch (err) {
        setError('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {error}
                </p>
              )}

              {!isLoading && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {filteredPeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && !error && filteredPeople.length > 0 && (
                <PeopleTable people={filteredPeople} selectedSlug={slug} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
