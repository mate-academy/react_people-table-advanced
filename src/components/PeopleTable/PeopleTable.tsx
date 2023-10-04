import React from 'react';
import { Person } from '../../types/Person';
import { Loader } from '../Loader';
import { PersonInfo } from '../PeopleInfo/PersonInfo';
import { TableHead } from './TableHead';

type Props = {
  people: Person[];
  isError: boolean;
  isLoading: boolean;
};

const tableHeads = ['Name', 'Sex', 'Born', 'Died'];

export const PeopleTable: React.FC<Props> = ({
  people,
  isError,
  isLoading,
}) => {
  return (
    <>
      {isLoading && <Loader />}

      {isError && !isLoading && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {!isError && !isLoading && !people.length && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      {!isError && !isLoading && people.length && (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              {tableHeads.map((th) => (
                <TableHead th={th} key={th} />
              ))}
              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {people.map((person) => (
              <PersonInfo key={person.slug} person={person} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
