import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types/Person';
import { Errors } from '../types/Errors';
import { getPeople } from '../api';
import { getFoolPeoplesInfo } from '../helpers/getFoolPeoplesInfo';
import { PeopleFilters } from '../components/PeopleFilters/PeopleFilters';
import { getPreparedPeople } from '../helpers/getPreparedPeople';
import { SomethingWhentWrong } from '../components/Errors/SomethingWentWrong';
import { NoPeopleOnServer } from '../components/Errors/NoPeopleOnServer';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [error, setError] = useState<Errors | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getPeople()
      .then((peopleFromServer) => {
        if (peopleFromServer.length === 0) {
          setError(Errors.noPeopleOnServer);
        } else {
          setPeoples(
            getFoolPeoplesInfo(peopleFromServer),
          );
        }
      })
      .catch(() => setError(Errors.SomethingWentWrong))
      .finally(() => setIsLoading(false));
  }, []);

  const peopleToRender = getPreparedPeople(
    peoples,
    {
      centuries: searchParams.getAll('centuries') || [],
      query: searchParams.get('query') || '',
      sex: searchParams.get('sex') || '',
      sortField: searchParams.get('sort') as keyof Person || '',
      order: searchParams.get('order') || '',
    },
  );

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {error === Errors.SomethingWentWrong && (
            <SomethingWhentWrong />
          )}

          {error === Errors.noPeopleOnServer && (
            <NoPeopleOnServer />
          )}

          {!isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && (<Loader />)}

              {!isLoading && !error && (
                peopleToRender.length
                  ? <PeopleTable peoples={peopleToRender} />
                  : (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
