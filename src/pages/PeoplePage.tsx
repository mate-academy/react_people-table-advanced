import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const hasPeopleLoaded = !!people?.length && !loading;

  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex' || '');
  const centuries = searchParams.getAll('centuries') || [];

  useEffect(() => {
    setError(false);
    setLoading(true);
    getPeople()
      .then((data) => {
        const updatedPeople = data.map(person => {
          const mother = person.motherName
            ? data.find(p => p.name === person.motherName) : undefined;
          const father = person.fatherName
            ? data.find(p => p.name === person.fatherName) : undefined;

          return { ...person, mother, father };
        });

        setPeople(updatedPeople);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredPeople = useMemo(() => {
    if (!people) {
      return null;
    }

    return people.filter(person => {
      return sex ? person.sex === sex : true;
    })
      .filter(person => {
        const normalizedQuery = query.toLowerCase().trim();

        return person.name.toLowerCase().includes(normalizedQuery)
        || person.motherName?.toLowerCase().includes(normalizedQuery)
        || person.fatherName?.toLowerCase().includes(normalizedQuery);
      })
      .filter(person => {
        const personBirthCentury = Math.floor(person.born / 100) + 1;
        const personDeathCentury = Math.floor(person.died / 100) + 1;

        if (centuries.length === 0) {
          return true;
        }

        return centuries.includes(personBirthCentury.toString())
        || centuries.includes(personDeathCentury.toString());
      });
  }, [centuries, people, query, sex]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {hasPeopleLoaded && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {people?.length === 0 && !loading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              <p>There are no people matching the current search criteria</p>

              {hasPeopleLoaded && <PeopleTable people={filteredPeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
