/* eslint-disable jsx-a11y/control-has-associated-label */
import { useSearchParams } from 'react-router-dom';
import React from 'react';

import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { preparePeople } from '../utils/preparePeople';
import { TableHeader } from './TableHeader';

interface Props {
  people: Person[],
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const preparedPeople = preparePeople(
    people,
    sex,
    query,
    centuries,
    sort,
    order,
  );

  const allNamesOnServer = people.map(person => person.name);

  const getParentSlug = (choseName: string) => people
    .find(person => person.name === choseName)?.slug;

  return (
    <>
      {!preparedPeople.length ? (
        <p>There are no people matching the current search criteria</p>
      ) : (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <TableHeader sort={sort} order={order} />

          <tbody>
            {preparedPeople.map(person => (
              <PersonLink
                key={person.slug}
                person={person}
                names={allNamesOnServer}
                getParentSlug={getParentSlug}
              />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
