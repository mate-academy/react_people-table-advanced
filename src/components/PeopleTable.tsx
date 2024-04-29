import React from 'react';
import { Person } from '../types';
import { PersonItem } from './PersonItem';
import { useLocation } from 'react-router-dom';
import { usePeople } from '../store/PeopleContext';
import { columnHeaders } from '../utils/columnHeaders';
import { SortNames } from './TableHeader';
import { sortPeople, filterPeople } from '../helpers/utils';

enum ErrorMessages {
  SomethingWentWrong = 'Something went wrong',
  NoPeopleOnTheServer = 'There are no people on the server',
}

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { isLoading, isError } = usePeople();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const sortColumn = params.get('sort') || '';
  const isReversed = params.get('order') === 'desc';
  const filterQuery = params.get('query') || '';
  const gender = params.get('sex') || '';
  const centuries = params.getAll('centuries') || '';

  const loadingAndError = !isLoading && isError;
  const shouldRenderTable = !isLoading && !isError && !!people.length;
  const noPeople = !isLoading && !people.length && !isError;

  let filteredPeople = [...people];

  filteredPeople = sortPeople(filteredPeople, sortColumn, isReversed);
  filteredPeople = filterPeople(filteredPeople, filterQuery, gender, centuries);

  return (
    <div className="block">
      <div className="box table-container">
        {loadingAndError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {ErrorMessages.SomethingWentWrong}
          </p>
        )}

        {shouldRenderTable && (
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                {columnHeaders.map(({ columnName, sortParam }) => (
                  <th key={columnName}>
                    <SortNames
                      columnName={columnName}
                      sortParam={sortParam}
                      sortColumn={sortColumn}
                      isReversed={isReversed}
                    />
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredPeople.map(person => (
                <PersonItem person={person} key={person.slug} />
              ))}
            </tbody>
          </table>
        )}

        {noPeople && (
          <p data-cy="noPeopleMessage">{ErrorMessages.NoPeopleOnTheServer}</p>
        )}
      </div>
    </div>
  );
};
