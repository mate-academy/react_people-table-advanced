import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { TypeErroros } from '../constants/Error';
import { useCallback, useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [chekError, setChekError] = useState(TypeErroros.start);
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [visiblePeoples, setVisiblePeoples] = useState<Person[]>([]);

  useEffect(() => {
    setChekError(TypeErroros.waitLoading);
    getPeople()
      .then(peopleFromServer => {
        setPeoples(peopleFromServer);
        setVisiblePeoples(peopleFromServer);
        if (!peopleFromServer || peopleFromServer.length === 0) {
          setChekError(TypeErroros.noPeople);
        } else {
          setChekError(TypeErroros.start);
        }
      })
      .catch(() => {
        setChekError(TypeErroros.loadingError);
      });
  }, []);
  const sotred = useCallback((newSorted: Person[]) => {
    return setVisiblePeoples(newSorted);
  }, []);

  const filterPerson = useCallback((newFilterTodo: Person[]) => {
    if (newFilterTodo.length === 0) {
      setChekError(TypeErroros.noPeopleSearch);
    } else {
      setChekError(TypeErroros.start);
    }

    setVisiblePeoples(newFilterTodo);

    return;
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {chekError === TypeErroros.start && visiblePeoples.length > 0 && (
              <PeopleFilters peoples={peoples} onFilter={filterPerson} />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {chekError === TypeErroros.waitLoading && <Loader />}

              {chekError === TypeErroros.loadingError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {chekError === TypeErroros.noPeople && peoples.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {chekError === TypeErroros.noPeopleSearch && (
                <p>There are no people matching the current search criteria</p>
              )}

              {chekError === TypeErroros.start && visiblePeoples.length > 0 && (
                <PeopleTable peoples={visiblePeoples} onFilter={sotred} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
