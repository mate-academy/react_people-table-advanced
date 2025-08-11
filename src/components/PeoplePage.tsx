import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';
import { getFilteredPeople } from '../utils/getFilteredPeople';

export const PeoplePage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [people, setPeople] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();

  const hasError = !loading && error;
  const noPeople = !loading && people.length === 0;
  const showContent = !loading && people.length > 0;
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
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        {loading && <Loader />}
        {hasError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}
        {noPeople && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}
        {showContent && (
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>

            <div className="column">
              <div className="box table-container">
                <PeopleTable peopleList={filteredAndSortedPeople} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
