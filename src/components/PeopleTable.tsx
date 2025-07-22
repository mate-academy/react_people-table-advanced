import { useContext, useEffect, useState } from 'react';
import { Person } from '../types';
import { PersonCard } from './PersonCard';
import { SortBtn } from './SortBtn/SortBtn';
import { AppContext } from '../context/AppContext';

type Props = {
  persons: Person[];
  currentSlug: string | undefined;
};

enum SortParams {
  NAME = 'Name',
  SEX = 'Sex',
  BORN = 'Born',
  DIED = 'Died',
}

const sortTable = (type: string, table: Person[], reverse: boolean = false) => {
  if (type.length && table.length) {
    const sortedTable = [...table];

    switch (type) {
      case 'name':
        if (reverse) {
          return sortedTable
            .sort((a, b) => a.name.localeCompare(b.name))
            .reverse();
        } else {
          return sortedTable.sort((a, b) => a.name.localeCompare(b.name));
        }

      case 'sex':
        if (reverse) {
          return sortedTable
            .sort((a, b) => a.sex.localeCompare(b.sex))
            .reverse();
        } else {
          return sortedTable.sort((a, b) => a.sex.localeCompare(b.sex));
        }

      case 'born':
        if (reverse) {
          return sortedTable.sort((a, b) => a.born - b.born).reverse();
        } else {
          return sortedTable.sort((a, b) => a.born - b.born);
        }

      case 'died':
        if (reverse) {
          return sortedTable.sort((a, b) => a.died - b.died).reverse();
        } else {
          return sortedTable.sort((a, b) => a.died - b.died);
        }

      default:
        return sortedTable;
    }
  }

  return table;
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ persons, currentSlug }) => {
  const [sortedPeople, setSortedPeople] = useState<Person[] | null>(null);
  const { searchParams } = useContext(AppContext);

  useEffect(() => {
    const isReverse = searchParams.has('order');
    const sortType = searchParams.get('sort') || '';
    const sortedTable = sortTable(sortType, persons, isReverse);

    setSortedPeople(sortedTable);
  }, [searchParams, persons]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(SortParams).map((el, index) => (
            <SortBtn name={el} key={index} />
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople?.length &&
          sortedPeople !== null &&
          sortedPeople.map((person, index) => (
            <PersonCard person={person} currentSlug={currentSlug} key={index} />
          ))}
      </tbody>
    </table>
  );
};
