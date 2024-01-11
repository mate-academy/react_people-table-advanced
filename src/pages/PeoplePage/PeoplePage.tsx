import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';
import { getPersonWithParents } from '../../utils/getPersonWithParents';
import { PeopleFilters } from '../../components/PeopleFilters';
import { filterAndSortPeople } from '../../utils/filterAndSortPeople';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const [initialPeople, setInitialPeople] = useState<Person[]>([]);
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoadingData(true);
    getPeople()
      .then((peopleFromServer) => {
        setInitialPeople(getPersonWithParents(peopleFromServer));
      })
      .catch(() => setIsError(true))
      .finally(() => {
        setIsLoadingData(false);
      });
  }, []);

  useEffect(() => {
    const nameQuery = searchParams.get('query');
    const filterSex = searchParams.get('sex');
    const filterCenturies = searchParams.getAll('centuries');
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');

    const preparedPeople = filterAndSortPeople({
      people: initialPeople, nameQuery, filterSex, filterCenturies, sort, order,
    });

    return setPeople(preparedPeople);
  }, [searchParams, initialPeople]);

  const isNoMatch = !isError
  && !isLoadingData
  && !people.length
  && initialPeople.length;
  const toShowPeople = !isError && !isLoadingData && Boolean(people.length);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoadingData && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isNoMatch ? (
                'There are no people matching the current search criteria'
              ) : (
                <>
                  {isLoadingData && <Loader />}

                  {isError && (
                    <p data-cy="peopleLoadingError" className="has-text-danger">
                      Something went wrong
                    </p>
                  )}

                  {!isLoadingData && !initialPeople.length && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}

                  {toShowPeople && <PeopleTable people={people} />}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
