/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { PeopleFilters } from '../PeopleFilters';

export const PeoplePage = () => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const query = searchParams.get('query');
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

  useEffect(() => {
    getPeople()
      .then((data) => setPeopleFromServer(data))
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  let visiblePeople = [...peopleFromServer];

  if (sort) {
    visiblePeople.sort((a, b) => {
      switch (sort) {
        case ('name'):
        case ('sex'):
          return a[sort].localeCompare(b[sort]);

        case ('born'):
          return (a.born - b.born);

        case ('died'):
          return (a.died - b.died);

        default:
          return 0;
      }
    });

    if (order === 'desc') {
      visiblePeople.reverse();
    }
  }

  if (query) {
    visiblePeople = visiblePeople.filter(({ name, motherName, fatherName }) => {
      return (
        name.toLowerCase().includes(query)
        || motherName?.toLowerCase().includes(query)
        || fatherName?.toLowerCase().includes(query)
      );
    });
  }

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (centuries.length) {
    const centuriesNumbers = centuries.map(c => +c);

    visiblePeople = visiblePeople
      .filter(person => centuriesNumbers
        .includes(Math.ceil(person.born / 100)));
  }

  const loader = isLoading && <Loader />;
  const errorMessage = error && (
    <p data-cy="peopleLoadingError" className="has-text-danger">
      Something went wrong
    </p>
  );
  const noPeopleMessage = !peopleFromServer.length
    && !isLoading
    && !error
    && (
      <p data-cy="noPeopleMessage">
        There are no people on the server
      </p>
    );

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && (
              <PeopleFilters
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {loader}
              {errorMessage}
              {noPeopleMessage}
              {!!peopleFromServer.length && (
                <PeopleTable
                  people={visiblePeople}
                  searchParams={searchParams}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
