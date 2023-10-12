import React, { useContext } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleContext } from '../PeopleContext';
import { PersonRow } from './PersonRow';
import { getFilteredPeople } from '../utils/functions';
import { TableHeader } from './TableHeader';
import { ErrorMessages } from '../types/ErrorMessages';

export const PeopleTable: React.FC = () => {
  const { peopleList } = useContext(PeopleContext);
  const [searchParams] = useSearchParams();

  const { peopleSlug } = useParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const filteredPeople = getFilteredPeople(peopleList, {
    sex,
    query,
    centuries,
    sort,
    order,
  });

  return (
    <>
      {filteredPeople.length
        ? (
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <TableHeader />

            <tbody>
              {filteredPeople.map(person => (
                <PersonRow
                  person={person}
                  peopleSlug={peopleSlug}
                  key={person.slug}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <p>
            {ErrorMessages.NoMatch}
          </p>
        )}
    </>
  );
};
