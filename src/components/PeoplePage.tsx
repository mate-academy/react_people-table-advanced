import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loadingModalIcon, setLoadingModalIcon] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);
  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const centuries = useMemo(() => {
    return searchParams.getAll('centuries').map(n => +n) || [];
  }, [searchParams]);
  const query = searchParams.get('query') || '';

  useEffect(() => {
    setErrorMessage(false);
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage(true))
      .finally(() => setLoadingModalIcon(false));
  }, []);

  const filterBySex = useMemo(() => {
    return people.filter(person => {
      switch (sex) {
        case 'm':
          return person.sex === 'm';
        case 'f':
          return person.sex === 'f';
        default:
          return person;
      }
    });
  }, [people, sex]);

  const filterByCenturies = useMemo(() => {
    if (centuries.length) {
      return filterBySex.filter(person =>
        centuries.includes(Math.ceil(person.born / 100)),
      );
    } else {
      return filterBySex;
    }
  }, [centuries, filterBySex]);

  const filterPeople = filterByCenturies.filter(
    person =>
      person.name
        .trim()
        .toLocaleLowerCase()
        .includes(query.trim().toLocaleLowerCase()) ||
      person.fatherName
        ?.trim()
        .toLocaleLowerCase()
        .includes(query.trim().toLocaleLowerCase()) ||
      person.motherName
        ?.trim()
        .toLocaleLowerCase()
        .includes(query.trim().toLocaleLowerCase()),
  );

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
              {loadingModalIcon ? (
                <Loader />
              ) : (
                <PeopleTable
                  people={filterPeople}
                  errorMessage={errorMessage}
                />
              )}

              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}
              {people.length === 0 && !errorMessage && !loadingModalIcon && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  There are no people on the server
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
