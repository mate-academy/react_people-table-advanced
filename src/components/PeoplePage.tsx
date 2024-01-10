import { useCallback, useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';

enum RenderStatus {
  PENDING = 'pending',
  REJECT = 'reject',
  RESOLVE = 'resolve',
}

export const PeoplePage = () => {
  const [renderStatus, setRenderStatus]
    = useState<RenderStatus>(RenderStatus.PENDING);
  const [people, setPeople] = useState<Person[] | null>(null);

  useEffect(() => {
    getPeople()
      .then((items) => {
        setPeople(items);
        setRenderStatus(RenderStatus.RESOLVE);
      })
      .catch(() => setRenderStatus(RenderStatus.REJECT));
  }, []);

  const renderPeople = useCallback(() => {
    switch (renderStatus) {
      case RenderStatus.REJECT:
        return (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        );

      case RenderStatus.RESOLVE:
        return people
          ? <PeopleTable people={people} />
          : (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          );

      default:
        return <Loader />;
    }
  }, [people, renderStatus]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {renderStatus === RenderStatus.RESOLVE && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {renderPeople()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
