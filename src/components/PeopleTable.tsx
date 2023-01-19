import React, { memo, useMemo } from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';

type Props = {
  people: Person[];
  selectedUser: string;
};

const rowValues = {
  Name: 'name',
  Sex: 'sex',
  Born: 'born',
  Died: 'died',
};

export const PeopleTable: React.FC<Props> = memo(({ people, selectedUser }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const findParent = (name: string) => {
    const findedParent = people.find(human => human.name === name);

    return findedParent
      ? <PersonLink person={findedParent} />
      : name;
  };

  const handleSetSorting = (value: string): SearchParams => {
    if (!sort && !order) {
      return { sort: value };
    }

    if (sort === value && !order) {
      return {
        sort: value,
        order: 'desc',
      };
    }

    return {
      sort: null,
      order: null,
    };
  };

  const sortedPeople = useMemo(() => (
    people.sort((first, second) => {
      switch (sort) {
        case 'name':
          return order === 'desc'
            ? second.name.localeCompare(first.name)
            : first.name.localeCompare(second.name);

        case 'sex':
          return order === 'desc'
            ? second.sex.localeCompare(first.sex)
            : first.sex.localeCompare(second.sex);

        case 'born':
          return order === 'desc'
            ? second.born - first.born
            : first.born - second.born;

        case 'died':
          return order === 'desc'
            ? second.died - first.died
            : first.died - second.died;

        default:
          return 0;
      }
    })
  ), [sort, order, people]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(rowValues).map(([key, value]) => (
            <th key={value}>
              <span className="is-flex is-flex-wrap-nowrap">
                {key}
                <SearchLink
                  params={handleSetSorting(value)}
                >
                  <span className="icon">
                    <i
                      className={cn(
                        'fas',
                        { 'fa-sort': sort !== value },
                        { 'fa-sort-up': sort === value && !order },
                        { 'fa-sort-down': sort === value && order },
                      )}
                    />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => (
          <tr
            data-cy="person"
            className={cn(
              { 'has-background-warning': selectedUser === person.slug },
            )}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            <td>
              {person.motherName
                ? findParent(person.motherName)
                : '-'}
            </td>

            <td>
              {person.fatherName
                ? findParent(person.fatherName)
                : '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});
