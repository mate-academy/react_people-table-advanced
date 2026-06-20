import { PeopleFilters } from '../PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [peopleLength, setPeopleLength] = useState(0);
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();

  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';

  const normalizedQuery = query.toLowerCase();

  const matchesQuery = (person: Person) => {
    const nameMatch = person.name.toLowerCase().includes(normalizedQuery);

    const motherMatch = person.motherName
      ? person.motherName.toLowerCase().includes(normalizedQuery)
      : false;

    const fatherMatch = person.fatherName
      ? person.fatherName.toLowerCase().includes(normalizedQuery)
      : false;

    return nameMatch || motherMatch || fatherMatch;
  };

  const filteredPeople = people.filter(matchesQuery);

  let finalPeople = filteredPeople;

  if (sex) {
    finalPeople = finalPeople.filter(person => person.sex === sex);
  }

  if (centuries.length > 0) {
    finalPeople = finalPeople.filter(person => {
      const century = Math.ceil(person.born / 100).toString();

      return centuries.includes(century);
    });
  }

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(peopleList => {
        setPeople(peopleList);
        setPeopleLength(peopleList.length);
        setError(false);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const isSearchEmpty =
    peopleLength > 0 && !finalPeople.length && !loading && !error;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && !error && peopleLength && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {peopleLength === 0 && !loading && !error && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isSearchEmpty && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!loading && !error && people.length > 0 && (
                <PeopleTable people={finalPeople} isLoading={loading} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
