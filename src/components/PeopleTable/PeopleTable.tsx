import React from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getSearchWith } from '../../utils/searchHelper';

type Props = {
  people?: Person[];
};

const columns = [
  { title: 'Name', key: 'name', sortable: true },
  { title: 'Sex', key: 'sex', sortable: true },
  { title: 'Born', key: 'born', sortable: true },
  { title: 'Died', key: 'died', sortable: true },
  { title: 'Mother', key: 'motherName', sortable: false },
  { title: 'Father', key: 'fatherName', sortable: false },
];

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const handleSort = (field: string) => {
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    if (currentSort !== field) {
      setSearchParams(
        getSearchWith(searchParams, {
          sort: field,
          order: null,
        }),
      );

      return;
    }

    if (!currentOrder) {
      setSearchParams(
        getSearchWith(searchParams, {
          order: 'desc',
        }),
      );

      return;
    }

    setSearchParams(
      getSearchWith(searchParams, {
        sort: null,
        order: null,
      }),
    );
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {columns.map(column => (
            <th key={column.key}>
              <span className="is-flex is-flex-wrap-nowrap">
                {column.title}

                {column.sortable && (
                  <Link
                    to={`/people?${getSearchWith(searchParams, {
                      sort: column.key,
                      order: null,
                    })}`}
                    onClick={event => {
                      event.preventDefault();
                      handleSort(column.key);
                    }}
                  >
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': sort !== column.key,
                          'fa-sort-up': sort === column.key && order !== 'desc',
                          'fa-sort-down':
                            sort === column.key && order === 'desc',
                        })}
                      />
                    </span>
                  </Link>
                )}
              </span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {people?.map(person => {
          const mother = people.find(per => per.name === person.motherName);
          const father = people.find(per => per.name === person.fatherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': slug === person.slug,
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
                ) : person.motherName ? (
                  person.motherName
                ) : (
                  '-'
                )}
              </td>
              <td>
                {father ? (
                  <PersonLink person={father} />
                ) : person.fatherName ? (
                  person.fatherName
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
