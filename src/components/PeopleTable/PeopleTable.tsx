import React, { memo, useMemo } from 'react';
import classnames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../../types/Person';
import { PersonLink } from '../PeopleLink/PersonLink';
import { SearchLink } from '../SearchLink/SearchLink';
import { SearchParams } from '../../utils/searchHelper';

type Props = {
  people: Person[];
};

const rowValues = {
  Name: 'name',
  Sex: 'sex',
  Born: 'born',
  Died: 'died',
};

export const PeopleTable: React.FC<Props> = memo(({ people }) => {
  const { selectedUser = '' } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const findParent = (name: string) => {
    const parent = people.find(human => human.name === name);

    return parent
      ? <PersonLink person={parent} />
      : name;
  };

  const setSorting = (value: string): SearchParams => {
    if ((!sort && !order) || (sort !== value)) {
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
        case 'sex':
          return order === 'desc'
            ? second[sort].localeCompare(first[sort])
            : first[sort].localeCompare(second[sort]);

        case 'born':
        case 'died':
          return order === 'desc'
            ? second[sort] - first[sort]
            : first[sort] - second[sort];

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
                  params={setSorting(value)}
                >
                  <span className="icon">
                    <i
                      className={classnames(
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
            key={person.slug}
            data-cy="person"
            className={classnames(
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
