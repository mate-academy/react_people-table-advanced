import { PeopleFilters } from './PeopleFilters';
import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { useParams } from 'react-router-dom';
import { PeopleTable } from './PeopleTable';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries').map(Number);
  const sex = searchParams.get('sex') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const query = searchParams.get('query')?.toLowerCase() || '';

  const filteredPeople = people.filter(person => {
    const name = person.name.toLowerCase();
    const mother = person.motherName?.toLowerCase() || '';
    const father = person.fatherName?.toLowerCase() || '';
    const matchesQuery =
      name.includes(query) || mother.includes(query) || father.includes(query);

    const personCentury = Math.floor((person.born - 1) / 100) + 1;
    const matchesCentury =
      centuries.length === 0 || centuries.includes(personCentury);

    const matchesSex = !sex || person.sex === sex;

    return matchesQuery && matchesCentury && matchesSex;
  });

  const handleSortChange = (field: string) => {
    const params = new URLSearchParams(searchParams);

    if (sort !== field) {
      params.set('sort', field);
      params.delete('order');
    } else if (order != 'desc') {
      params.set('sort', field);
      params.set('order', 'desc');
    } else {
      params.delete('sort');
      params.delete('order');
    }

    setSearchParams(params);
  };

  const sortedPeople = [...filteredPeople];

  if (sort) {
    sortedPeople.sort((a, b) => {
      let result = 0;

      if (sort === 'name' || sort === 'sex') {
        result = a[sort].localeCompare(b[sort]);
      } else if (sort === 'born' || sort === 'died') {
        result = (a[sort] || 0) - (b[sort] || 0);
      }

      return order === 'desc' ? -result : result;
    });
  }

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
              {isLoading ? (
                <Loader />
              ) : error ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              ) : filteredPeople.length === 0 ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : (
                <PeopleTable
                  people={sortedPeople}
                  selectedSlug={slug}
                  sort={sort}
                  order={order}
                  onSortChange={handleSortChange}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
