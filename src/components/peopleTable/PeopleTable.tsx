import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { SortableField, SortOrder } from '../../types/types';
import { PeopleTableHead } from './PeopleTableHead';
import { PeopleTableRow } from './PeopleTableRow';

type Props = {
  people: Person[];
};

const getSortCallback = (
  field: SortableField,
): ((firstPerson: Person, secondPerson: Person) => number) => {
  switch (field) {
    case SortableField.Name:
    case SortableField.Sex:
      return (firstPerson: Person, secondPerson: Person) =>
        firstPerson[field]
          .toLowerCase()
          .localeCompare(secondPerson[field].toLowerCase());
    case SortableField.Born:
    case SortableField.Died:
      return (firstPerson: Person, secondPerson: Person) =>
        firstPerson[field] - secondPerson[field];
    default:
      throw new Error('Sortable field is not valid!!!');
  }
};

const sortPeople = (
  people: Person[],
  field: SortableField | null,
  reverse: boolean,
): Person[] => {
  if (field) {
    people.sort(getSortCallback(field));

    if (reverse) {
      people.reverse();
    }
  }

  return people;
};

export const PeopleTable = React.memo(({ people }: Props) => {
  const [searchParams] = useSearchParams();
  const selectedField = searchParams.get('sort') as SortableField | null;
  const order = searchParams.get('order') as SortOrder.Descending | null;
  const sortedPeople = useMemo(
    () => sortPeople([...people], selectedField, !!order),
    [people, order, selectedField],
  );

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <PeopleTableHead />

      <tbody>
        {sortedPeople.map(person => (
          <PeopleTableRow key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
});

PeopleTable.displayName = 'PeopleTable';
