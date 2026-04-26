import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { Field, PeopleTable } from './PeopleTable';
import { useEffect, useMemo, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';

const getPrepearedPeople = (people: Person[], params: URLSearchParams) => {
  let prepearedPeople = [...people];

  if (params.has('sex')) {
    prepearedPeople = prepearedPeople.filter(
      person => person.sex === params.get('sex'),
    );
  }

  if (params.has('query')) {
    prepearedPeople = prepearedPeople.filter(person => {
      const normalizedQuery = params.get('query')?.toLowerCase() || '';

      return (
        person.name.toLowerCase().includes(normalizedQuery) ||
        person.fatherName?.toLowerCase().includes(normalizedQuery) ||
        person.motherName?.toLowerCase().includes(normalizedQuery)
      );
    });
  }

  if (params.has('centuries')) {
    const centuries = params.getAll('centuries');

    prepearedPeople = prepearedPeople.filter(person => {
      const bornCentury = Math.ceil(person.born / 100).toString();

      return centuries?.includes(bornCentury);
    });
  }

  if (params.has('sort')) {
    if (params.has('order')) {
      prepearedPeople = prepearedPeople.sort((p1, p2) => {
        switch (params.get('sort')) {
          case Field.Name:
            return p2.name.localeCompare(p1.name);
          case Field.Sex:
            return p2.sex.localeCompare(p1.sex);
          case Field.Born:
            return p2.born - p1.born;
          case Field.Died:
            return p2.died - p1.died;
          default:
            return 0;
        }
      });
    } else {
      prepearedPeople = prepearedPeople.sort((p1, p2) => {
        switch (params.get('sort')) {
          case Field.Name:
            return p1.name.localeCompare(p2.name);
          case Field.Sex:
            return p1.sex.localeCompare(p2.sex);
          case Field.Born:
            return p1.born - p2.born;
          case Field.Died:
            return p1.died - p2.died;
          default:
            return 0;
        }
      });
    }
  }

  return prepearedPeople;
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loaderPeople, setLoaderPeople] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setLoaderPeople(true);
    setErrorMessage('');

    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setLoaderPeople(false));
  }, []);

  const visiblePeople = useMemo(() => {
    return getPrepearedPeople(people, searchParams);
  }, [people, searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loaderPeople && !errorMessage && people.length !== 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loaderPeople && <Loader />}

              {!loaderPeople && errorMessage && (
                <p data-cy="peopleLoadingError">{errorMessage}</p>
              )}

              {!loaderPeople && !errorMessage && visiblePeople.length > 0 && (
                <PeopleTable people={visiblePeople} />
              )}

              {!loaderPeople && !errorMessage && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {visiblePeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
