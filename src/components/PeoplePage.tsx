import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useParams, useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [centuries, setCenturies] = useState<number[]>([]);
  const [searchParams] = useSearchParams();
  const { slug } = useParams();
  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const selectedCenturies = searchParams.getAll('centuries');

  useEffect(() => {
    const loadPeople = async () => {
      try {
        const data = await getPeople();
        const dataserach = data.map(person => ({
          ...person,
          mother: data.find(p => p.name === person.motherName),
          father: data.find(p => p.name === person.fatherName),
          bornCentury: Math.ceil(person.born / 100),
          diedCentury: Math.ceil(person.died / 100),
        }));
        const allCentrues = dataserach.flatMap(p => [
          p.bornCentury,
          p.diedCentury,
        ]);
        const uniqueCenturies = Array.from(new Set(allCentrues)).sort(
          (a, b) => a - b,
        );

        setCenturies(uniqueCenturies);
        setPeople(dataserach);
      } catch (err) {
        setError('Failed');
      } finally {
        setIsLoading(false);
      }
    };

    loadPeople();
  }, []);

  const filteredPeople = people.filter(person => {
    const matchesSex = !sex || person.sex === sex;
    const matchesQuery =
      !query ||
      person.name.toLowerCase().includes(query.toLowerCase()) ||
      person.motherName?.toLowerCase().includes(query.toLowerCase()) ||
      person.fatherName?.toLowerCase().includes(query.toLowerCase());
    const matchesCentury =
      selectedCenturies.length === 0 ||
      selectedCenturies.some(
        c => person.bornCentury === +c || person.diedCentury === +c,
      );

    return matchesSex && matchesQuery && matchesCentury;
  });
  const sortedPeople = [...filteredPeople];

  if (sort) {
    sortedPeople.sort((a, b) => {
      const field = sort as keyof Person;
      const aValue = a[field] ?? '';
      const bValue = b[field] ?? '';
      let comparison = 0;

      if (aValue > bValue) {
        comparison = 1;
      } else if (aValue < bValue) {
        comparison = -1;
      }

      return order === 'desc' ? comparison * -1 : comparison;
    });
  }

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !error && (
              <PeopleFilters
                centuries={centuries}
                selectedCenturies={selectedCenturies}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}
              {people.length === 0 && !isLoading && !error && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {filteredPeople.length === 0 && people.length > 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people matching the current search criteria
                </p>
              )}

              {filteredPeople.length > 0 && (
                <PeopleTable
                  people={sortedPeople}
                  order={order}
                  sort={sort}
                  selectedSlug={slug}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
