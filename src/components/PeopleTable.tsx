import classNames from 'classnames';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
  personId: string;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  personId,
}) => {
  const [searchParams] = useSearchParams();
  const sortName = searchParams.get('sort');
  const order = searchParams.get('order');

  const columnWithSort = ['name', 'sex', 'born', 'died'];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {columnWithSort.map(columnName => (
            <th
              key={columnName}
            >
              <span className="is-flex is-flex-wrap-nowrap">
                {columnName.charAt(0).toUpperCase() + columnName.slice(1)}
                <SearchLink
                  params={{
                    sort: (sortName === columnName && order === 'desc')
                      ? null
                      : columnName,
                    order: (order === 'desc' || sortName !== columnName)
                      ? null
                      : 'desc',
                  }}
                >
                  <span
                    aria-hidden
                    className="icon"
                  >
                    <i className={classNames('fas', {
                      'fa-sort': sortName !== columnName,
                      'fa-sort-up':
                      order === null && sortName === columnName,
                      'fa-sort-down':
                        order === 'desc' && sortName === columnName,
                    })}
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
        {people.map(person => {
          const {
            sex,
            born,
            died,
            fatherName,
            motherName,
            slug,
          } = person;
          const mother = people.find(human => human.name === motherName);
          const father = people.find(human => human.name === fatherName);

          return (
            <tr
              key={slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': slug === personId,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother
                  ? (
                    <PersonLink person={mother} />
                  )
                  : motherName || '-'}
              </td>
              <td>
                {father
                  ? (
                    <PersonLink person={father} />
                  )
                  : fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
