import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../../types';
import { PersonLink } from '../PersonLink';
import { getSearchWith } from '../../../utils/searchHelper'; // Перевір шлях до утиліти у своєму проєкті

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams<{ slug?: string }>();
  const [searchParams] = useSearchParams();

  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const sortableFields = ['name', 'sex', 'born', 'died'];

  // Функція обчислення нових searchParams для 3-етапного сортування
  const getSortParams = (field: string) => {
    if (currentSort !== field) {
      // 1-й клік: за зростанням (asc)
      return { sort: field, order: null };
    }

    if (!currentOrder) {
      // 2-й клік: за спаданням (desc)
      return { sort: field, order: 'desc' };
    }

    // 3-й клік: скидання сортування
    return { sort: null, order: null };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-fullwidth is-striped is-hoverable is-narrow"
    >
      <thead>
        <tr>
          {sortableFields.map(field => {
            const isSorted = currentSort === field;

            return (
              <th key={field}>
                <Link
                  to={{
                    search: getSearchWith(searchParams, getSortParams(field)),
                  }}
                  className="is-clickable"
                >
                  {/* Без {' '} після слова, щоб тест не бачив зайвого пробілу */}
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                  {isSorted && (
                    <span className="icon">
                      <i
                        className={cn('fas', {
                          'fa-sort-up': !currentOrder,
                          'fa-sort-down': currentOrder === 'desc',
                        })}
                      />
                    </span>
                  )}
                </Link>
              </th>
            );
          })}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const isSelected = person.slug === slug;

          const motherPerson = people.find(p => p.name === person.motherName);
          const fatherPerson = people.find(p => p.name === person.fatherName);

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={cn({ 'has-background-warning': isSelected })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName ? (
                  motherPerson ? (
                    <PersonLink person={motherPerson} />
                  ) : (
                    person.motherName
                  )
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.fatherName ? (
                  fatherPerson ? (
                    <PersonLink person={fatherPerson} />
                  ) : (
                    person.fatherName
                  )
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
