import { FC } from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { Link } from 'react-router-dom';
import { useFilters } from '../../hooks/useFilters';
import cn from 'classnames';
import { SORT_COLUMNS } from '../../constants/SORT_COLUMNS';

type Props = {
  visiblePeople: Person[];
};

export const PeopleTable: FC<Props> = ({ visiblePeople }) => {
  const { sort, order, personSlug, handleSorting } = useFilters();

  return (
    <>
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            {SORT_COLUMNS.map(columnName => {
              const lowerName = columnName.toLowerCase();

              return (
                <th key={columnName}>
                  <span className="is-flex is-flex-wrap-nowrap">
                    {columnName}
                    <Link to={{ search: handleSorting(lowerName) }}>
                      <span className="icon">
                        <i
                          className={cn('fas', {
                            'fa-sort': sort !== lowerName,
                            'fa-sort-up': sort === lowerName && !order,
                            'fa-sort-down': sort === lowerName && order,
                          })}
                        />
                      </span>
                    </Link>
                  </span>
                </th>
              );
            })}
            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>
        <tbody>
          {visiblePeople.map(person => {
            return (
              <tr
                key={person.slug}
                className={cn({
                  'has-background-warning': personSlug === person.slug,
                })}
                data-cy="person"
              >
                <td>
                  <PersonLink person={person} />
                </td>

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>
                  {!person.mother ? (
                    person.motherName || '-'
                  ) : (
                    <PersonLink person={person.mother} />
                  )}
                </td>
                <td>
                  {!person.father ? (
                    person.fatherName || '-'
                  ) : (
                    <PersonLink person={person.father} />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
