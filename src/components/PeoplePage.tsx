import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { findPersonByName, normalizeString } from '../utils/helpers';
import { Person } from '../types';
import { Sex } from '../utils/Sex';

export const PeoplePage = () => {
  // work with server
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then(response => {
        const newPeople = response.map(person => ({
          ...person,
          mother: findPersonByName(response, person.motherName),
          father: findPersonByName(response, person.fatherName),
        }));

        setPeople(newPeople);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const isEverythingOk = !isError && !isLoading && !!people.length;
  const isNoPeopleOnServer = !isError && !isLoading && !people.length;
  // #endregion
  const [filterParams] = useSearchParams();
  const query = filterParams.get('query') || '';
  const centuries = filterParams.getAll('centuries') || [];
  const sex = filterParams.get('sex') as Sex || null;
  const sortOption = filterParams.get('sort') || null;
  const sortOrder = filterParams.get('order') || null;
  const noFilterChoose = !query && !centuries.length && !sex && !sortOption;

  const includesQuery = (person: Person) => {
    if (!query) {
      return true;
    }

    const { name, motherName, fatherName } = person;
    const normalizedQuery = normalizeString(query) as string;

    return normalizeString(name)?.includes(normalizedQuery)
      || normalizeString(motherName)?.includes(normalizedQuery)
      || normalizeString(fatherName)?.includes(normalizedQuery);
  };

  const filteredPeople = useMemo(() => {
    if (noFilterChoose) {
      return people;
    }

    const temp = people
      .filter(person => includesQuery(person))
      .filter(person => (sex ? sex === person.sex : true))
      .filter(person => (centuries.length > 0
        ? centuries.includes(Math.ceil(person.born / 100).toString())
        : true
      ));

    if (sortOption) {
      temp.sort((a, b) => {
        switch (sortOption) {
          case 'name':
          case 'sex': return a[sortOption].localeCompare(b[sortOption]);
          case 'born':
          case 'died': return a[sortOption] - b[sortOption];
          default: return 0;
        }
      });
    }

    if (sortOrder) {
      temp.reverse();
    }

    return temp;
  }, [people, query, centuries, sex]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {isEverythingOk && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading ? (
                <Loader />
              ) : (isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              ))}
              {isNoPeopleOnServer && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isEverythingOk && (
                !filteredPeople.length ? (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                ) : (
                  <PeopleTable people={filteredPeople} />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
