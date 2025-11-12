import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { slug } = useParams<{ slug?: string }>();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    setError('');
    getPeople()
      .then(setPeople)
      .catch(() => setError('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  const visiblePeople = people
    .filter(person => {
      const query = searchParams.get('query') || null;

      if (!query) {
        return true;
      }

      const nameMatch = person.name.toLowerCase().includes(query.toLowerCase());
      const motherMatch = person.motherName
        ?.toLowerCase()
        .includes(query.toLowerCase());
      const fatherMatch = person.fatherName
        ?.toLowerCase()
        .includes(query.toLowerCase());

      return nameMatch || motherMatch || fatherMatch;
    })
    .filter(person => {
      const centuries = searchParams.getAll('centuries') || null;

      if (centuries.length === 0) {
        return true;
      }

      const bornCentury = Math.ceil(person.born / 100);

      return centuries.includes(String(bornCentury));
    })
    .filter(person => {
      const sex = searchParams.get('sex');

      if (!sex) {
        return true;
      }

      return person.sex === sex;
    });

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  if (sort) {
    visiblePeople.sort((a, b) => {
      if (sort === 'name' || sort === 'sex') {
        return a[sort].localeCompare(b[sort]);
      }

      if (sort === 'born' || sort === 'died') {
        return a[sort] - b[sort];
      }

      return 0;
    });

    if (order === 'desc') {
      visiblePeople.reverse();
    }
  }

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        {error}
      </p>
    );
  }

  if (people.length === 0) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

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
              {visiblePeople.length !== 0 ? (
                <PeopleTable
                  people={visiblePeople}
                  selectedSlug={slug}
                  sort={sort}
                  order={order}
                />
              ) : (
                <p>There are no people matching the current search criteria</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
