import classNames from 'classnames';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { SortOrder } from '../../utils/SortOrder';
import { SearchLink } from '../SearchLink';
import { TableLink } from '../TableLink';

type Props = {
  people: Person[];
  sort: string;
  order: SortOrder;
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

            const isSameField = sort === tagName;

            return (
              <th key={columnName}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {columnName}
                  <SearchLink
                    params={{
                      sort: !isSameField || (isSameField && !order)
                        ? tagName
                        : null,
                      order: isSameField && !order
                        ? SortOrder.DESC
                        : null,
                    }}
                  >
                    <span className="icon">
                      <i className={classNames(
                        'fas fa-sort',
                        {
                          'fa-sort-up': isSameField && !order,
                          'fa-sort-down': isSameField
                            && order === SortOrder.DESC,
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
