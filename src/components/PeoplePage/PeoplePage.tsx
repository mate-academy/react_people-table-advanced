import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { getPeople } from '../../api';
import { Person } from '../../types';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const order = searchParams.get('order');
  const sort = searchParams.get('sort');

  const [
    peopleFromServer,
    setPeopleFromServer,
  ] = useState<Person[] | null>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(setPeopleFromServer)
      .catch(() => setIsError(true));
  }, []);

  const filteredPeople = useMemo(() => {
    if (!peopleFromServer) {
      return null;
    }

    let peopleToFilter = [...peopleFromServer];

    if (query) {
      const normalizedQuery = query.toLowerCase();

      peopleToFilter = peopleToFilter.filter(person => {
        const { name, motherName, fatherName } = person;

        return name.includes(normalizedQuery)
          || motherName?.includes(normalizedQuery)
          || fatherName?.includes(normalizedQuery);
      });
    }

    if (sex) {
      if (sex === 'm') {
        peopleToFilter = peopleToFilter.filter(person => person.sex === 'm');
      } else {
        peopleToFilter = peopleToFilter.filter(person => person.sex === 'f');
      }
    }

    if (centuries.length > 0) {
      peopleToFilter = peopleToFilter.filter(
        (person) => centuries.includes(`${Math.ceil(person.born / 100)}`),
      );
    }

    if (sort) {
      switch (sort) {
        case 'name':
          if (order === 'asc') {
            peopleToFilter = peopleToFilter.sort(
              (a, b) => a.name.localeCompare(b.name),
            );
          } else if (order === 'desc') {
            peopleToFilter = peopleToFilter.sort(
              (a, b) => b.name.localeCompare(a.name),
            );
          }

          break;

        case 'sex':
          if (order === 'asc') {
            peopleToFilter = peopleToFilter.sort(
              (a, b) => a.sex.localeCompare(b.sex),
            );
          } else if (order === 'desc') {
            peopleToFilter = peopleToFilter.sort(
              (a, b) => b.sex.localeCompare(a.sex),
            );
          }

          break;

        case 'born':
          if (order && order === 'asc') {
            peopleToFilter = peopleToFilter.sort((a, b) => a.born - b.born);
          } else if (order === 'desc') {
            peopleToFilter = peopleToFilter.sort((a, b) => b.born - a.born);
          }

          break;

        case 'died':
          if (order && order === 'asc') {
            peopleToFilter = peopleToFilter.sort((a, b) => a.died - b.died);
          } else if (order === 'desc') {
            peopleToFilter = peopleToFilter.sort((a, b) => b.died - a.died);
          }

          break;

        default:
          break;
      }
    }

    return peopleToFilter;
  }, [peopleFromServer, query, sex, centuries, sort, order]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">

          {peopleFromServer && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {(!peopleFromServer && !isError) && (
                <Loader />
              )}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {(peopleFromServer && !peopleFromServer?.length) && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!!filteredPeople?.length && (
                <PeopleTable
                  people={filteredPeople}
                  peopleFromServer={peopleFromServer}
                />
              )}

              {(filteredPeople && !filteredPeople.length) && (
                <p>There are no people matching the current search criteria</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
