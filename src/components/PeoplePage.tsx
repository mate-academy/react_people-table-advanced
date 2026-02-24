/* eslint-disable @typescript-eslint/indent */
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError('');
    getPeople()
      .then(setPeople)
      .catch(() => {
        setError('Something went wrong');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredPeople = people.filter(person => {
    const personCentury = Math.ceil(person.born / 100);

    if (sex && person.sex !== sex) {
      return false;
    }

    if (query) {
      const q = query.toLowerCase();
      const matches =
        person.name.toLowerCase().includes(q) ||
        (person.motherName && person.motherName.toLowerCase().includes(q)) ||
        (person.fatherName && person.fatherName.toLowerCase().includes(q));

      if (!matches) {
        return false;
      }
    }

    if (centuries.length > 0 && !centuries.includes(String(personCentury))) {
      return false;
    }

    return true;
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

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && !error && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}
              {error && <p data-cy="peopleLoadingError">{error}</p>}
              {!loading && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {!loading &&
                !error &&
                people.length > 0 &&
                filteredPeople.length === 0 && (
                  <p data-cy="noPeopleMessage">
                    There are no people matching the current search criteria
                  </p>
                )}

              {!loading && !error && sortedPeople.length > 0 && (
                <PeopleTable people={sortedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
