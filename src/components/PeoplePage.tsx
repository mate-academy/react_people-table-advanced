import { useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { useLocation } from 'react-router-dom';
import { Loader } from './Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [originalPeople, setOriginalPeople] = useState<Person[]>([]);
  const [errorLoad, setErrorLoad] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const { pathname, search } = useLocation();

  useEffect(() => {
    setLoading(true);
    setErrorLoad('');

    getPeople()
      .then(data => {
        setPeople(data);
        setOriginalPeople(data);
        setErrorLoad('');
      })
      .catch(() => {
        setErrorLoad('Something went wrong');
        setPeople([]);
        setOriginalPeople([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      {pathname}
      <br />
      {search}

      {errorLoad && (
        <div className="notification is-danger" data-cy="peopleLoadingError">
          <button className="delete"></button>
          {errorLoad}
        </div>
      )}

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading &&
              (people.length > 0 ? (
                <PeopleFilters
                  peopleList={originalPeople}
                  onPeople={setPeople}
                  onError={setErrorLoad}
                />
              ) : (
                <PeopleFilters
                  peopleList={originalPeople}
                  onPeople={setPeople}
                  onError={setErrorLoad}
                />
              ))}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              <PeopleTable
                peoplelist={people}
                originalPeoplelist={originalPeople}
                loader={loading}
                onPeople={setPeople}
                errortext={errorLoad}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
