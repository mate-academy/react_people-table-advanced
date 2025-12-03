import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useParams, useSearchParams } from 'react-router-dom';
import { SortableField } from '../types/SortableFields';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  const { slug } = useParams();

  const query = searchParams.get('query')?.toLowerCase() || '';
  const selectedCenturies = searchParams.getAll('centuries');
  const selectedSex = searchParams.get('sex');
  const sortField = searchParams.get('sort') as SortableField | null;
  const sortOrder = searchParams.get('order');

  const filteredByName = people.filter(person =>
    [person.name, person.fatherName, person.motherName].some(name =>
      name?.toLowerCase().includes(query),
    ),
  );

  const filteredByCentury = filteredByName.filter(person => {
    const century = Math.floor(person.born / 100) + 1;

    return (
      selectedCenturies.length === 0 ||
      selectedCenturies.includes(String(century))
    );
  });

  const filteredBySex = filteredByCentury.filter(
    person => !selectedSex || person.sex === selectedSex,
  );

  const sortedPeople = [...filteredBySex].sort((a, b) => {
    if (!sortField) {
      return 0;
    }

    const valA = a[sortField];
    const valB = b[sortField];

    if (valA === undefined || valB === undefined) {
      return 0;
    }

    return sortOrder === 'desc' ? (valA < valB ? 1 : -1) : valA > valB ? 1 : -1;
  });

  useEffect(() => {
    const loadPeople = async () => {
      setError('');
      setLoading(true);

      try {
        const data = await getPeople();

        setPeople(data);
      } catch {
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && !error && people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {error && <p data-cy="peopleLoadingError">{error}</p>}
              {!isLoading && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !error && people.length > 0 && (
                <PeopleTable people={sortedPeople} selectedSlug={slug} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
