import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [peoples, setPeople] = useState<Person[]>([]);

  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(true);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const filteredPeople = peoples
    .filter((person: Person) => {
      return sex !== '' ? person.sex === sex : true;
    })
    .filter((person: Person) => {
      return (
        person.name.toLowerCase().includes(query.toLowerCase()) ||
        (person.motherName || '').toLowerCase().includes(query.toLowerCase()) ||
        (person.fatherName || '').toLowerCase().includes(query.toLowerCase())
      );
    })
    .filter((person: Person) => {
      if (centuries.length === 0) {
        return true;
      }

      return centuries.some(
        date => Number(date) === Math.ceil(person.born / 100),
      );
    })
    .sort((a, b) => {
      if (!sort) {
        return 0;
      }

      const direction = order === 'desc' ? -1 : 1;

      const aVal = a[sort as 'name' | 'sex' | 'born' | 'died'];
      const bVal = b[sort as 'name' | 'sex' | 'born' | 'died'];

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return aVal.localeCompare(bVal) * direction;
      } else {
        return (Number(aVal) - Number(bVal)) * direction;
      }
    });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loader && !error && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loader ? (
                <Loader />
              ) : (
                <>
                  {error && (
                    <p data-cy="peopleLoadingError">Something went wrong</p>
                  )}

                  {peoples.length === 0 ? (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  ) : filteredPeople.length === 0 ? (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  ) : (
                    <PeopleTable peoples={filteredPeople} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
