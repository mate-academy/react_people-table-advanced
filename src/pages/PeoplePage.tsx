import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { getPreparedPeople } from '../utils/findPeopleByName';
import { PeopleFilters } from '../components/PeopleFilters';
import { filterTableOfPeople } from '../utils/filterTableOfPeople';
import { FilterParam } from '../types/FilterParams';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const sex = searchParams.get(FilterParam.Sex);
  const order = searchParams.get(FilterParam.Order);
  const query = searchParams.get(FilterParam.Query);
  const centuries = searchParams.getAll(FilterParam.Centuries);
  const sortField = searchParams.get(FilterParam.Sort);

  const filtredPeople = filterTableOfPeople(
    people,
    sex,
    query,
    centuries,
    sortField,
    order,
  );

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const peopleFromServer = await getPeople();

      setPeople(getPreparedPeople(peopleFromServer));
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const IS_TABLE_EMPTY = !people.length && !isLoading && !isError;
  const IS_LOADING_ERROR = isError && !isLoading;
  const HAS_PEOPLE_LIST = !!people?.length && !isError;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!!people.length && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="box table-container">
            {isLoading && (
              <Loader />
            )}

            {IS_LOADING_ERROR && (
              <p
                data-cy="peopleLoadingError"
                className="has-text-danger"
              >
                Something went wrong
              </p>
            )}

            {IS_TABLE_EMPTY && (
              <p
                data-cy="noPeopleMessage"
              >
                There are no people on the server
              </p>
            )}

            {HAS_PEOPLE_LIST && (
              <PeopleTable people={filtredPeople} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
