import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';
import { getFilteredPeople } from '../utils/filterPeople';
import { Loader } from '../components/Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const order = searchParams.get('order') || '';
  const sortBy = searchParams.get('sort') || '';

  const filteredPeople = useMemo(() => (
    getFilteredPeople(
      people,
      sex,
      query,
      sortBy,
      order,
      centuries,
    )
  ), [sex, query, centuries, sortBy, order]);

  const fetchPeople = async () => {
    setError(false);
    setLoading(true);

    try {
      const peopleFromServer = await getPeople();

      const peopleWithParents = peopleFromServer.map(person => ({
        ...person,
        mother: peopleFromServer.find(
          mother => mother.name === person.motherName,
        ),
        father: peopleFromServer.find(
          father => father.name === person.fatherName,
        ),
      }));

      setPeople(peopleWithParents);
      setLoading(false);
    } catch {
      setError(true);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {loading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError">
              Something went wrong
            </p>
          )}

          {people.length === 0 && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people.length > 0 && (
            <>
              <div className="column is-7-tablet is-narrow-desktop">
                <PeopleFilters />
              </div>

              <div className="column">
                <div className="box table-container">
                  <PeopleTable
                    people={filteredPeople}
                    loading={loading}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
