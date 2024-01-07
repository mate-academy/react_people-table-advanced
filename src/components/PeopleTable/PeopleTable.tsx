import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { ErrorType } from '../../types/error-enum';
import { PersonInfo } from './PersonInfo/PersonInfo';
import { PeopleFilters } from '../Filters/PeopleFilters';
import { getFilteredPeople } from '../../utils/searchHelper';
import { TableHead } from './TableHead/TableHead';

export const PeoplePage = () => {
  const [people, setPeopleFS] = useState<Person[] | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const hasNoPeopleFromSrver = people?.length === 0;
  const hasLoadingError = error === ErrorType.PEOPLE_LOADING;

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeopleFS)
      .catch(() => setError(ErrorType.PEOPLE_LOADING))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filteredPeople = getFilteredPeople(searchParams, people);
  const hasNoMatchingPeople = filteredPeople?.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {people
             && (
               <div className="column is-7-tablet is-narrow-desktop">
                 <PeopleFilters />
               </div>
             )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasLoadingError
            && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                {ErrorType.PEOPLE_LOADING}
              </p>
            )}

              {hasNoPeopleFromSrver && !error
            && (
              <p data-cy="noPeopleMessage">
                {ErrorType.NO_PEOPLE_ON_SERVER}
              </p>
            )}

              {hasNoMatchingPeople
            && (
              <p>
                {ErrorType.NO_MATCHING}
              </p>
            )}

              {people && !hasNoMatchingPeople
            && (
              <table
                data-cy="peopleTable"
                className="table is-striped is-hoverable is-narrow is-fullwidth"
              >

                <TableHead />

                <tbody>
                  {filteredPeople?.map(person => (
                    <PersonInfo
                      key={person.slug}
                      person={person}
                      peopleFromServer={people}
                    />
                  ))}
                </tbody>
              </table>
            )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
