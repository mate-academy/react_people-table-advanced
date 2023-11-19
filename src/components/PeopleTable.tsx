import React from 'react';
import cn from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonItem } from './PersonItem';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  people: Person[],
  filteredPeople: Person[],
};

const findPerson = (people: Person[], personName: string | null) => {
  return people.find(person => person.name === personName) || null;
};

const COLUMNS = {
  name: 'Name',
  sex: 'Sex',
  born: 'Born',
  died: 'Died',
};

export const PeopleTable: React.FC<Props> = ({ people, filteredPeople }) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const onSortChange = (newSort: string) => {
    if (sort !== newSort) {
      return getSearchWith(searchParams, { sort: newSort, order: null });
    }

    if (sort && !order) {
      return getSearchWith(searchParams, { sort: newSort, order: 'desc' });
    }

    return getSearchWith(searchParams, { sort: null, order: null });
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(COLUMNS).map(([sortType, text]) => (
            <th key={sortType}>
              <span className="is-flex is-flex-wrap-nowrap">
                {text}
                <Link to={{
                  search: onSortChange(sortType),
                }}
                >
                  <span className="icon">
                    <i className={cn('fas', {
                      'fa-sort': sort !== sortType,
                      'fa-sort-up': sort === sortType && !order,
                      'fa-sort-down': sort === sortType && order === 'desc',
                    })}
                    />
                  </span>
                </Link>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredPeople.map(person => {
          const mother = findPerson(people, person.motherName);
          const father = findPerson(people, person.fatherName);

          return (
            <PersonItem
              key={person.slug}
              person={person}
              mother={mother}
              father={father}
            />
          );
        })}
      </tbody>
    </table>
  );
};
