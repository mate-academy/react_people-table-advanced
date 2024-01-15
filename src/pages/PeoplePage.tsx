import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { getPeopleWithParrents } from '../helpers';
import { Loader, PeopleFilters } from '../components';
import { PeopleList } from '../components/peopleList';

export const PeoplePage = () => {
  const [loadingPeople, setLoadingPeople] = useState<boolean>(true);
  const [people, setPeople] = useState<Person[]>([]);
  const [errors, setErrors] = useState<string>('');

  useEffect(() => {
    getPeople()
      .then(data => setPeople(getPeopleWithParrents(data)))
      .catch(() => setErrors('Something went wrong'))
      .finally(() => setLoadingPeople(false));
  }, []);

  const renderContent = () => {
    if (loadingPeople) {
      return (
        <>
          <div className="column">
            <div className="box table-container">
              <Loader />
            </div>
          </div>
        </>
      );
    }

    if (!loadingPeople && errors) {
      return (
        <>
          <div className="column">
            <div className="box table-container">
              <p data-cy="peopleLoadingError" className="has-text-danger">
                {errors}
              </p>
            </div>
          </div>
        </>
      );
    }

    if (!loadingPeople && people.length === 0) {
      return (
        <>
          <div className="column">
            <div className="box table-container">
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            </div>
          </div>
        </>
      );
    }

    return (
      <>
        <div className="column is-7-tablet is-narrow-desktop">
          <PeopleFilters />
        </div>
        <div className="column">
          <div className="box table-container">
            <PeopleList people={people} />
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {renderContent()}
        </div>
      </div>
    </>
  );
};
