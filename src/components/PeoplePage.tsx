import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();
  const { slug } = useParams();

  useEffect(() => {
    setLoading(true);
    setError(false);

    getPeople()
      .then(data => {
        // Agregar madre y padre como objetos
        const peopleWithParents = data.map(person => ({
          ...person,
          mother: data.find(p => p.name === person.motherName),
          father: data.find(p => p.name === person.fatherName),
        }));

        setPeople(peopleWithParents);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  // Leer search params
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');
  const sortField = searchParams.get('sort') || '';
  const sortOrder = searchParams.get('order') || 'asc';

  // Filtrar personas
  let visiblePeople = [...people];

  // Filtro por nombre
  if (query) {
    const lowerQuery = query.toLowerCase();

    visiblePeople = visiblePeople.filter(
      person =>
        person.name.toLowerCase().includes(lowerQuery) ||
        person.motherName?.toLowerCase().includes(lowerQuery) ||
        person.fatherName?.toLowerCase().includes(lowerQuery),
    );
  }

  // Filtro por sexo
  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  // Filtro por siglos
  if (centuries.length > 0) {
    visiblePeople = visiblePeople.filter(person => {
      const century = Math.ceil(person.born / 100);

      return centuries.includes(String(century));
    });
  }

  // Ordenamiento
  if (sortField) {
    visiblePeople.sort((a, b) => {
      const aValue = a[sortField as keyof Person];
      const bValue = b[sortField as keyof Person];

      if (aValue === bValue) {
        return 0;
      }

      const comparison = aValue! < bValue! ? -1 : 1;

      return sortOrder === 'desc' ? -comparison : comparison;
    });
  }

  const hasNoPeople = !loading && !error && people.length === 0;
  const hasNoMatchingPeople =
    !loading && !error && people.length > 0 && visiblePeople.length === 0;
  const hasPeople = !loading && !error && visiblePeople.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {people.length > 0 && !loading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && !loading && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {hasNoPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {hasNoMatchingPeople && (
                <p>There are no people matching the current search criteria</p>
              )}

              {hasPeople && (
                <PeopleTable people={visiblePeople} selectedSlug={slug} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
