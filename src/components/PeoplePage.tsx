import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getPeople } from '../api';
import { Loader } from './Loader';
import { Person } from '../types';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');

  // #region initialLoad
  const getPeopleFromServer = async () => {
    try {
      setIsLoading(true);
      const response = await getPeople();

      setPeopleFromServer(response);
    } catch {
      setError(true);
      setTimeout(() => setError(false), 1000);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPeopleFromServer();
  }, []);
  // #endregion

  // #region getVisiblePeople

  // #region filter
  function setFilteredPeople(people: Person[]) {
    let result = [...people];

    if (sex) {
      result = result.filter(person => person.sex === sex);
    }

    if (query) {
      const ifIncludes = (personName: string | null) => {
        return personName && personName.toLowerCase().includes(query);
      };

      result = result.filter(
        ({ name, motherName, fatherName }) => ifIncludes(name)
          || ifIncludes(motherName)
          || ifIncludes(fatherName),
      );
    }

    if (centuries.length) {
      result = result.filter(
        person => centuries.includes(Math.ceil(person.born / 100).toString()),
      );
    }

    return result;
  }
  // #endregion

  // #region sort
  function setSortPeople(people: Person[]) {
    let result = [...people];

    if (sort) {
      result.sort((a, b) => {
        switch (sort) {
          case 'name':
          case 'sex':
            return a[sort].localeCompare(b[sort]);
          case 'born':
          case 'died':
            return (a[sort] - b[sort]);
          default:
            return 0;
        }
      });
    }

    if (order) {
      result = result.reverse();
    }

    return result;
  }
  // #endregion

  const visiblePeople = setSortPeople(setFilteredPeople(peopleFromServer));
  // #endregion

  function getMarkUp() {
    switch (true) {
      case isLoading:
        return (<Loader />);
      case error:
        return (
          <p
            data-cy="peopleLoadingError"
            className="has-text-danger"
          >
            Something went wrong
          </p>
        );
      case !peopleFromServer.length:
        return (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        );
      case !!peopleFromServer.length:
        return (<PeopleTable people={visiblePeople} />);
      default:
        return (<></>);
    }
  }

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
              {getMarkUp()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
