import React from 'react';
import { Person } from '../types';
import { PersonItem } from './PersonItem';
import { useLocation } from 'react-router-dom';
import { usePeople } from '../store/PeopleContext';
import { columnHeaders } from '../utils/columnHeaders';
import { TableHeader } from './TableHeader';

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

  const copyPeople = [...people];

  if (sortColumn) {
    switch (sortColumn) {
      case 'name':
        copyPeople.sort((personA, personB) =>
          personA.name.localeCompare(personB.name),
        );
        break;

      case 'sex':
        copyPeople.sort((personA, personB) =>
          personA.sex.localeCompare(personB.sex),
        );
        break;

      case 'born':
        copyPeople.sort((personA, personB) => personA.born - personB.born);
        break;

      case 'died':
        copyPeople.sort((personA, personB) => personA.died - personB.died);
        break;

      default:
        break;
    }
  }

  if (isReversed) {
    copyPeople.reverse();
  }

  let filteredPeople = copyPeople;

  if (filterQuery) {
    filteredPeople = filteredPeople.filter(person =>
      person.name.toLowerCase().includes(filterQuery.toLowerCase()),
    );
  }

  if (gender) {
    filteredPeople = filteredPeople.filter(person => person.sex === gender);
  }

  if (centuries.length > 0) {
    filteredPeople = filteredPeople.filter(person => {
      const century = Math.floor((person.born - 1) / 100) + 1;

      return centuries.includes(century.toString());
    });
  }

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
                    <TableHeader
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
              {filteredPeople.map(person => {
                return <PersonItem person={person} key={person.slug} />;
              })}
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
