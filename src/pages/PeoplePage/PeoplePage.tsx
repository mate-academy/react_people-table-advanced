import { PeopleFilters } from '../../components/PeopleFilter/PeopleFilters';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../../api/api';
import { Person } from '../../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [arePeopleLoading, setArePeopleLoading] = useState(false);
  const [isLoadingSuccessful, setIsLoadingSuccessful] = useState(false);

  const errorMessage = (
    <p data-cy="peopleLoadingError" className="has-text-danger">
      Something went wrong
    </p>
  );
  const emptyPeopleMessage = (
    <p data-cy="noPeopleMessage">There are no people on the server</p>
  );

  useEffect(() => {
    setArePeopleLoading(true);
    getPeople()
      .then(peopleFromServer => {
        setPeople(peopleFromServer);
        setIsLoadingSuccessful(true);
      })
      .finally(() => {
        setArePeopleLoading(false);
      });
  }, []);

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
              {arePeopleLoading ? (
                <Loader />
              ) : isLoadingSuccessful ? (
                people.length > 0 ? (
                  <PeopleTable people={people} />
                ) : (
                  emptyPeopleMessage
                )
              ) : (
                errorMessage
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
