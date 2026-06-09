import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { getPeople } from '../../api';
import { Loader } from '../../components/Loader/Loader';
import { PeopleFilters } from '../PeopleFilters';
import { PeopleTable } from '../PeopleTable';
import { Person } from '../../types/Person';

export const PeoplePage = () => {
  const { slug } = useParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query')?.toLowerCase() || '';
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const centuries = searchParams.getAll('centuries');

  const filteredPeople = people.filter(person => {
    const matchesQuery =
      person.name.toLowerCase().includes(query) ||
      (person.motherName?.toLowerCase().includes(query) ?? false) ||
      (person.fatherName?.toLowerCase().includes(query) ?? false);

    const birthCentury = Math.ceil(person.born / 100);

    const matchesCentury =
      !centuries.length || centuries.includes(String(birthCentury));

    return matchesQuery && matchesCentury;
  });

  const sortedPeople = [...filteredPeople];

  if (sort) {
    sortedPeople.sort((a, b) => {
      let result = 0;

      switch (sort) {
        case 'name':
          result = a.name.localeCompare(b.name);
          break;

        case 'sex':
          result = a.sex.localeCompare(b.sex);
          break;

        case 'born':
          result = a.born - b.born;
          break;

        case 'died':
          result = a.died - b.died;
          break;
      }

      return order === 'desc' ? -result : result;
    });
  }

  useEffect(() => {
    setLoading(true);
    setHasError(false);

    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="box table-container">
        {loading && <Loader />}

        {!loading && hasError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {!loading && !hasError && people.length === 0 && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {!loading && !hasError && people.length > 0 && (
          <div className="block">
            <div className="columns is-desktop is-flex-direction-row-reverse">
              <div className="column is-7-tablet is-narrow-desktop">
                <PeopleFilters />
              </div>

              <div className="column">
                <div className="box table-container">
                  <PeopleTable people={sortedPeople} selectedSlug={slug} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
