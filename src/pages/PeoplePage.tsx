import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';
import { Person } from '../types';
import { getFilteredPeople } from '../utils/getFilteredPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const peopleWithParents = people.reduce((newPeople: Person[], person) => {
    const mother = people.find(mom => mom.name === person.motherName);
    const father = people.find(dad => dad.name === person.fatherName);

    const updatedPerson = {
      ...person,
      mother,
      father,
    };

    newPeople.push(updatedPerson);

    return newPeople;
  }, []);

  const filteredAndSortedPeople = getFilteredPeople(peopleWithParents, {
    sex,
    query,
    centuries,
    sort,
    order,
  });

  useEffect(() => {
    const fetchPeople = async () => {
      setLoading(true);

      try {
        const fetchedPeople = await getPeople();

        setPeople(fetchedPeople);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPeople();
  }, []);

  return (
    <div>
      <h1 className="title">People Page</h1>
      {loading && <Loader />}
      {error && (
        <p className="has-text-danger" data-cy="peopleLoadingError">
          Error loading data
        </p>
      )}
      {!loading && people.length === 0 && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      {!loading && people.length > 0 && (
        <>
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="box table-container">
            <PeopleTable peopleList={filteredAndSortedPeople} />
          </div>
        </>
      )}
    </div>
  );
};
