import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { TableHeadItem } from '../TableHeadItem/TableHeadItem';
import { TableBody } from '../TableBody/TableBody';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const preparePeople = (peopleFromServer: Person[]) => {
    let preparedPeople = [...peopleFromServer];

    if (sex) {
      preparedPeople = preparedPeople
        .filter(person => person.sex === sex);
    }

    if (query) {
      const normalizedQuery = query.toLowerCase().trim();

      preparedPeople = preparedPeople
        .filter(person => person.name.toLowerCase().includes(normalizedQuery)
          || person.fatherName?.toLowerCase().includes(normalizedQuery)
          || person.motherName?.toLowerCase().includes(normalizedQuery));
    }

    if (centuries.length > 0) {
      preparedPeople = preparedPeople
        .filter(person => centuries
          .includes(Math.ceil(person.born / 100).toString()));
    }

    if (sort) {
      preparedPeople.sort((person1, person2) => {
        switch (sort) {
          case 'born':
          case 'died':
            return person1[sort] - person2[sort];
          case 'name':
          case 'sex':
            return person1[sort].localeCompare(person2[sort]);
          default:
            return 0;
        }
      });
    }

    if (order) {
      preparedPeople.reverse();
    }

    return preparedPeople;
  };

  return (
    (preparePeople(people).length === 0) ? (
      <p>There are no people matching the current search criteria</p>
    ) : (
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <TableHeadItem />

        <TableBody
          people={people}
          preparePeople={preparePeople}
        />
      </table>
    )
  );
};
