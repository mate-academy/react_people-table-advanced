import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { Person } from '../types';

import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoadingPeople, setIsLoadingPeople] = useState(false);
  const [isLoadingPeopleError, setIsLoadingPeopleError] = useState(false);

  useEffect(() => {
    setIsLoadingPeople(true);

    getPeople()
      .then(setPeople)
      .catch(() => setIsLoadingPeopleError(true))
      .finally(() => setIsLoadingPeople(false));
  }, []);

  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const sortField = searchParams.get('sort');
  const isReversed = searchParams.get('order') === 'desc';

  const getVisiblePeople = () => {
    let visiblePeople = [...people];

    if (sex) {
      visiblePeople = visiblePeople.filter(person => person.sex === sex);
    }

    if (query) {
      const normalizeQuery = query.toLocaleLowerCase();

      visiblePeople = visiblePeople.filter(person => {
        return [person.name, person.motherName || '', person.fatherName || '']
          .join('\n')
          .toLocaleLowerCase()
          .includes(normalizeQuery);
      });
    }

    if (centuries.length) {
      visiblePeople = visiblePeople.filter(person =>
        centuries.includes(Math.ceil(person.born / 100).toString()),
      );
    }

    if (sortField) {
      visiblePeople.sort((a, b) => {
        switch (sortField) {
          case 'name':
          case 'sex':
            return a[sortField].localeCompare(b[sortField]);

          case 'born':
          case 'died':
            return a[sortField] - b[sortField];

          default:
            return 0;
        }
      });

      if (isReversed) {
        visiblePeople.reverse();
      }
    }

    return visiblePeople;
  };

  return (
    <>
      {isLoadingPeople ? (
        <Loader />
      ) : (
        <>
          <h1 className="title">People Page</h1>

          <div className="block">
            <div className="columns is-desktop is-flex-direction-row-reverse">
              <div className="column is-7-tablet is-narrow-desktop">
                <PeopleFilters />
              </div>

              <div className="column">
                <div className="box table-container">
                  {isLoadingPeopleError && (
                    <p data-cy="peopleLoadingError" className="has-text-danger">
                      Something went wrong
                    </p>
                  )}

                  {!people.length && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}

                  <PeopleTable people={getVisiblePeople()} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
