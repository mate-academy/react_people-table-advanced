import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { Person } from '../types';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';
import { useFilters } from './useFilters';

export enum CategoriesToSortBy {
  SexToShow = 'sex',
  Query = 'query',
  Centuries = 'centuries',
  sortBy = 'sortBy',
  sortOrder = 'sortOrder',
}

export const People: React.FC = () => {
  const [people, setPeople] = useState<Person[]>();
  const [isError, setIsError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  const query = searchParams.get(CategoriesToSortBy.Query) || '';
  const ShowAllMaleF = searchParams.get(CategoriesToSortBy.SexToShow) || '';
  const centuries = searchParams.getAll(CategoriesToSortBy.Centuries) || [];
  const sortBy = searchParams.get(CategoriesToSortBy.sortBy) || '';
  const sortOrder = searchParams.get(CategoriesToSortBy.sortOrder) || '';

  useEffect(() => {
    getPeople().then((res) => {
      setPeople(res);
    }).catch((error) => {
      setIsError(error);
    });
  }, []);

  const filteredPeople = useFilters(
    ShowAllMaleF === 'm' || ShowAllMaleF === 'f' ? ShowAllMaleF : null,
    query,
    centuries,
    sortBy,
    sortOrder,
    people || undefined,
  );

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              {people && (<PeopleFilters />)}
            </div>

            <div className="column">
              <div className="box table-container">
                {(!people) && (<Loader />)}

                {(isError) && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    Something went wrong
                  </p>
                )}

                {(people?.length === 0) && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

                {(filteredPeople?.length === 0) && (people?.length !== 0) && (
                  <p className="has-text-danger">
                    There are no people matching the current search criteria
                  </p>
                )}
                {people && (
                  <PeopleTable people={filteredPeople} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
