import { Loader } from '../../components/Loader';
import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';
import { getPeople } from '../../api';
import { PeopleFilters } from '../../components/PeopleFilters/PeopleFilters';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getPeople()
      .then(newPeople => setPeople(newPeople))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  let content;

  if (isLoading) {
    return (
      <>
        <h1 className="title">People Page</h1>
        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column">
              <div className="box table-container">
                <Loader />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else if (isError) {
    content = (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  } else if (people.length == 0) {
    content = (
      <p data-cy="noPeopleMessage">There are no people on the server</p>
    );
  } else {
    content = <PeopleTable people={people} />;
  }

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>
          <div className="column">
            <div className="box table-container">{content}</div>
          </div>
        </div>
      </div>
    </>
  );
};
