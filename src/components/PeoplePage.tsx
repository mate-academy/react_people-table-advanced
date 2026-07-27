import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { Person } from '../types';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';

function getVisiblePeople(people: Person[], searchParams: URLSearchParams) {
  const sex = searchParams.get('sex');
  const query = searchParams.get('query')?.toLowerCase() || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  let visible = [...people];

  if (sex) {
    visible = visible.filter(person => person.sex === sex);
  }

  if (query) {
    visible = visible.filter(
      person =>
        person.name.toLowerCase().includes(query) ||
        person.motherName?.toLowerCase().includes(query) ||
        person.fatherName?.toLowerCase().includes(query),
    );
  }

  if (centuries.length > 0) {
    visible = visible.filter(person => {
      const century = Math.ceil(person.born / 100).toString();

      return centuries.includes(century);
    });
  }

  if (sort) {
    visible.sort((a, b) => {
      switch (sort) {
        case 'name':
        case 'sex':
          return a[sort].localeCompare(b[sort]);
        case 'born':
        case 'died':
          return a[sort] - b[sort];
        default:
          return 0;
      }
    });

    if (order === 'desc') {
      visible.reverse();
    }
  }

  return visible;
}

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loader, setLoader] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setLoader(false));
  }, []);

  const visiblePeople = useMemo(
    () => getVisiblePeople(people, searchParams),
    [people, searchParams],
  );

  const peopleLoaded = !loader && !errorMessage;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {peopleLoaded && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loader && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {peopleLoaded && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {peopleLoaded &&
                people.length > 0 &&
                (visiblePeople.length === 0 ? (
                  <p>There are no people matching the filter criteria</p>
                ) : (
                  <PeopleTable people={visiblePeople} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
