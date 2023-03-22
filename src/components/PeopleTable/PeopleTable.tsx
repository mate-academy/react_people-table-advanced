import classNames from 'classnames';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { SearchLink } from '../SearchLink';
import { TableLink } from '../TableLink';

type Props = {
  people: Person[];
  sort: string;
  order: string;
};

export const PeopleTable: FC<Props> = ({ people, sort, order }) => {
  const { personId } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['Name', 'Sex', 'Born', 'Died'].map(columnName => {
            const tagName = columnName.toLowerCase();

            return (
              <th key={columnName}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {columnName}
                  <SearchLink
                    params={{
                      sort: sort !== tagName || (sort === tagName && !order)
                        ? tagName
                        : null,
                      order: sort === tagName && !order
                        ? 'desc'
                        : null,
                    }}
                  >
                    <span className="icon">
                      <i className={classNames(
                        'fas fa-sort',
                        {
                          'fa-sort-up': sort === tagName && !order,
                          'fa-sort-down': sort === tagName && order === 'desc',
                        },
                      )}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>
            );
          })}

          <th>Mother</th>

          <th>Father</th>
        </tr>
      </thead>

      <tbody>

        {people.map(person => {
          const {
            born,
            died,
            fatherName,
            father,
            motherName,
            mother,
            sex,
            slug,
          } = person;

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames(
                { 'has-background-warning': personId === slug },
              )}
            >
              <td>
                <TableLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother
                  ? (
                    <TableLink person={mother} />
                  )
                  : motherName || '-'}
              </td>
              <td>
                {father
                  ? (
                    <TableLink person={father} />
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
