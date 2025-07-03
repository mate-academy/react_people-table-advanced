import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleFilters } from '../PeopleFilters/PeopleFilters';
import { Loader } from '../Loader/Loader';
import { PeopleTablet } from '../PeopleTablet/PeopleTablet';
import { filterAndSortPeople } from '../../utils/peopleFilter';

export const PeoplePage = () => {
  const { person } = useParams();
  const [searchParams] = useSearchParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchPeople = async () => {
    try {
      setLoading(true);
      setError(false);
      const data = await getPeople();

      setPeople(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const filteredAndSortedPeople = useMemo(() => {
    const query = searchParams.get('query') || '';
    const sex = searchParams.get('sex');
    const centuries = searchParams.getAll('centuries');
    const sort = searchParams.get('sort') as keyof Person | null;
    const order = searchParams.get('order') === 'desc' ? 'desc' : 'asc';

    return filterAndSortPeople({
      people,
      query,
      sex,
      centuries,
      sort,
      order,
    });
  }, [people, searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!loading && !error && filteredAndSortedPeople.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people matching the current search criteria
                </p>
              )}

              {!loading && !error && filteredAndSortedPeople.length > 0 && (
                <PeopleTablet
                  people={filteredAndSortedPeople}
                  person={person}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
