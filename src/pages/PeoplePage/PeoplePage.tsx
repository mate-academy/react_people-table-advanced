import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Loader } from '../../components/Loader';
import { PeopleFilters } from '../../components/PeopleFilters/PeopleFilters';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';
import { Person } from '../../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = useMemo(
    () => searchParams.getAll('centuries'),
    [searchParams],
  );
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || 'asc';

  useEffect(() => {
    setIsLoading(true);
    setError('');
    getPeople()
      .then(setPeople)
      .catch(() => setError('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredPeople = useMemo(() => {
    return people.filter(person => {
      const matchesQuery = [
        person.name,
        person.fatherName,
        person.motherName,
      ].some(name => name?.toLowerCase().includes(query.toLowerCase()));
      const matchesSex = sex ? person.sex === sex : true;
      const matchesCentury = centuries.length
        ? centuries.includes(Math.ceil(person.born / 100).toString())
        : true;

      return matchesQuery && matchesSex && matchesCentury;
    });
  }, [people, query, sex, centuries]);

  const sortedPeople = useMemo(() => {
    return [...filteredPeople].sort((a, b) => {
      if (!sort) {
        return 0;
      }

      const itemOne = a[sort as keyof Person];
      const itemTwo = b[sort as keyof Person];

      if (itemOne == null || itemTwo == null) {
        return 0;
      }

      if (itemOne < itemTwo) {
        return order === 'asc' ? -1 : 1;
      }

      if (itemOne > itemTwo) {
        return order === 'asc' ? 1 : -1;
      }

      return 0;
    });
  }, [filteredPeople, sort, order]);
  //console.log('here')

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
              {isLoading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {error}
                </p>
              )}

              {!isLoading && !error && sortedPeople.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people matching the current search criteria
                </p>
              )}

              {!isLoading && !error && sortedPeople.length > 0 && (
                <PeopleTable people={sortedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
