import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Person } from '../types';
import { PeopleTable } from './PeopleTable';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(data => setPeople(data))
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries').map(Number);
  const filteredPeople = people.filter(person => {
    const nameMatch =
      person.name.toLowerCase().includes(query.toLowerCase()) ||
      person.motherName?.toLowerCase().includes(query.toLowerCase()) ||
      person.fatherName?.toLowerCase().includes(query.toLowerCase());

    const sexMatch = !sex || person.sex === sex;

    const centuryMatch =
      !centuries.length || centuries.includes(Math.ceil(person.born / 100));

    return nameMatch && sexMatch && centuryMatch;
  });

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
              {isLoading ? (
                <div data-cy="loader">
                  <Loader />
                </div>
              ) : error ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              ) : people.length === 0 ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : (
                <PeopleTable people={filteredPeople} selectedSlug={slug} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
