import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const { slug } = useParams();

  const [searchParams] = useSearchParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const visiblePeople = useMemo(() => {
    let result = [...people];

    const query = searchParams.get('query')?.toLowerCase() || '';

    const centuries = searchParams.getAll('centuries');

    const sort = searchParams.get('sort');
    const order = searchParams.get('order');
    const sex = searchParams.get('sex');

    if (sex) {
      result = result.filter(person => person.sex === sex);
    }

    if (query) {
      result = result.filter(person =>
        [person.name, person.motherName, person.fatherName]
          .filter(Boolean)
          .some(value => value!.toLowerCase().includes(query)),
      );
    }

    if (centuries.length) {
      result = result.filter(person => {
        const century = Math.ceil(person.born / 100);

        return centuries.includes(String(century));
      });
    }

    if (sort) {
      result.sort((a, b) => {
        let res = 0;

        switch (sort) {
          case 'name':
            res = a.name.localeCompare(b.name);
            break;

          case 'sex':
            res = a.sex.localeCompare(b.sex);
            break;

          case 'born':
            res = a.born - b.born;
            break;

          case 'died':
            res = a.died - b.died;
            break;
        }

        return order === 'desc' ? -res : res;
      });

      // if (order === 'desc') {
      //   result.reverse();
      // }
    }

    return result;
  }, [people, searchParams]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
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
              {people.length === 0 ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : !visiblePeople.length ? (
                <p>There are no people matching the current search criteria</p>
              ) : (
                <PeopleTable people={visiblePeople} selectedSlug={slug} />
              )}
              {/* <Loader />

              <p data-cy="peopleLoadingError">Something went wrong</p>

          <p data-cy="noPeopleMessage">There are no people on the server</p> */}

              {/* <p>There are no people matching the current search criteria</p> */}

              {/* <PeopleTable /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
