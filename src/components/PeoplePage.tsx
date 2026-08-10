import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import React, { useEffect, useMemo, useState } from 'react';
import { getPeople } from '../api';
import { useParams, useSearchParams } from 'react-router-dom';

export const PeoplePage: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const [searchParams] = useSearchParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);

  const visiblePeople = useMemo(() => {
    const currentSex = searchParams.get('sex');
    const currentQuery = searchParams.get('query') || '';
    const currentCenturies = searchParams.getAll('centuries');

    return people.filter(person => {
      if (currentSex && person.sex !== currentSex) {
        return false;
      }

      const normalizedQuery = currentQuery.trim().toLocaleLowerCase();

      if (normalizedQuery) {
        const matchesName = person.name.toLowerCase().includes(normalizedQuery);
        const matchesMother = person.motherName
          ?.toLowerCase()
          .includes(normalizedQuery);
        const matchesFather = person.fatherName
          ?.toLowerCase()
          .includes(normalizedQuery);

        if (!matchesName && !matchesMother && !matchesFather) {
          return false;
        }
      }

      if (currentCenturies.length > 0) {
        const century = Math.ceil(person.born / 100).toString();

        if (!currentCenturies.includes(century)) {
          return false;
        }
      }

      return true;
    });
  }, [people, searchParams]);

  const hasNoPeopleOnServer = !loading && !errorMessage && people.length === 0;
  const hasNoMatchingPeople =
    !loading &&
    !errorMessage &&
    people.length > 0 &&
    visiblePeople.length === 0;

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && !errorMessage && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {hasNoPeopleOnServer && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {hasNoMatchingPeople && (
                <p data-cy="noPeopleMatchingMessage">
                  There are no people matching the current search criteria
                </p>
              )}

              {!loading && !errorMessage && visiblePeople.length > 0 && (
                <PeopleTable people={visiblePeople} activePerson={slug} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
