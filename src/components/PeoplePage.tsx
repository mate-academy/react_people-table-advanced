import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { LoaderEnum } from '../types/loader';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {

  const [error, setError] = useState('');
  const [loader, setLoader] = useState<LoaderEnum>(
    LoaderEnum.initial
  );

  const [people, setPeople] = useState<Person[]>([]);  useEffect(() => {
    setLoader(LoaderEnum.loading);


    getPeople().then((data) => {setPeople(data)})
      .catch(error => {
        setError(error);
      })
      .finally(() => {
        setLoader(LoaderEnum.loaded);
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
              {/*<Loader />*/}

              {/*<p data-cy="peopleLoadingError">Something went wrong</p>*/}

              {/*<p data-cy="noPeopleMessage">There are no people on the server</p>*/}

              {/*<p>There are no people matching the current search criteria</p>*/}

              <PeopleTable people={people} error={error} loader={loader}  />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
