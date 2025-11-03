/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Order, Person, TableField } from '../types';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import PersonLink from './PersonLink';
import cn from 'classnames';

type Props = {
  people: Person[];
};

const NO_PARENT = '-';
const TABLE_FIELDS: TableField[] = [
  { name: 'name', sortable: true },
  { name: 'sex', sortable: true },
  { name: 'born', sortable: true },
  { name: 'died', sortable: true },
  { name: 'mother', sortable: false },
  { name: 'father', sortable: false },
];

const sortIcons: Record<Order, React.ReactNode> = {
  [Order.ALL]: <i className="fas fa-sort" />,
  [Order.ASC]: <i className="fas fa-sort-up" />,
  [Order.DESC]: <i className="fas fa-sort-down" />,
};

const getNextOrder = (order: Order) => {
  switch (order) {
    case Order.ALL:
      return Order.ASC;
    case Order.ASC:
      return Order.DESC;
    case Order.DESC:
    default:
      return Order.ALL;
  }
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug: selectedPersonSlug } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const sortField = searchParams.get('sort') as keyof Person | null;
  const sortOrder = (searchParams.get('order') as Order) || Order.ALL;

  const handleSort = (
    event: React.MouseEvent<HTMLAnchorElement>,
    fieldName: keyof Person,
  ) => {
    event.preventDefault();

    const isSameField = sortField === fieldName;
    const nextOrder: Order = isSameField ? getNextOrder(sortOrder) : Order.ASC;

    navigate(
      nextOrder === Order.ALL ? '' : `?sort=${fieldName}&order=${nextOrder}`,
      { replace: true },
    );
  };

  const peopleByName = React.useMemo(() => {
    const map: Record<string, Person> = {};

    people.forEach(person => {
      map[person.name] = person;
    });

    return map;
  }, [people]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {TABLE_FIELDS.map(field => (
            <th key={field.name}>
              <span className="is-flex is-flex-wrap-nowrap">
                {field.name.at(0)?.toUpperCase() + field.name.slice(1)}

                {field.sortable && (
                  <a
                    href={`#/people?sort=${field.name}`}
                    onClick={event => handleSort(event, field.name)}
                  >
                    <span className="icon">
                      {sortField === field.name
                        ? sortIcons[sortOrder]
                        : sortIcons[Order.ALL]}
                    </span>
                  </a>
                )}
              </span>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = peopleByName[person.motherName || ''];
          const father = peopleByName[person.fatherName || ''];

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={cn({
                'has-background-warning': selectedPersonSlug === person.slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother ? (
                  <PersonLink person={mother} />
                ) : (
                  person.motherName || NO_PARENT
                )}
              </td>
              <td>
                {father ? (
                  <PersonLink person={father} />
                ) : (
                  person.fatherName || NO_PARENT
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
