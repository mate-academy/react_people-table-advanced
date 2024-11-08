/* eslint-disable jsx-a11y/control-has-associated-label */

import React from 'react';
import { Person } from '../types';
import classNames from 'classnames';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import { ColumnOption } from '../types/ColumnOption';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams<{ slug: string }>();

  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || 'asc';
  const sexFilter = searchParams.get('sex');

  const findPersonByName = (name?: string) => {
    return name ? people.find(person => person.name === name) : undefined;
  };

  const filteredPeople = sexFilter
    ? people.filter(person => person.sex.toLowerCase() === sexFilter)
    : people;

  const optionsForColumns = Object.values(ColumnOption);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {optionsForColumns.map(option => {
            const isSortedColumn = sort === option.toLowerCase();
            const newOrder = isSortedColumn && order === 'asc' ? 'desc' : 'asc';
            const isSortable =
              option !== ColumnOption.MOTHER && option !== ColumnOption.FATHER;

            return (
              <th key={option}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {option}
                  {isSortable && (
                    <Link
                      to={`/people?sort=${option.toLowerCase()}&order=${newOrder}`}
                    >
                      <span className="icon">
                        <i
                          className={classNames('fas', {
                            'fa-sort': !isSortedColumn,
                            'fa-sort-up': isSortedColumn && order === 'asc',
                            'fa-sort-down': isSortedColumn && order === 'desc',
                          })}
                        />
                      </span>
                    </Link>
                  )}
                </span>
              </th>
            );
          })}
        </tr>
      </thead>

      <tbody>
        {filteredPeople.map(person => (
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
              {person.motherName ? (
                findPersonByName(person.motherName) ? (
                  <PersonLink
                    person={findPersonByName(person.motherName) as Person}
                  />
                ) : (
                  person.motherName
                )
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.fatherName ? (
                findPersonByName(person.fatherName) ? (
                  <PersonLink
                    person={findPersonByName(person.fatherName) as Person}
                  />
                ) : (
                  person.fatherName
                )
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}

        {/* {optionsForColumns.map(option => (
          <td key={option}>
            {(() => {
              switch (option) {
                case ColumnOption.NAME:
                  return <PersonLink person={person} />;

                case ColumnOption.SEX:
                  return person.sex;

                case ColumnOption.BORN:
                  return person.born;

                case ColumnOption.DIED:
                  return personalbar.died;

                case ColumnOption.MOTHER:
                  return person
              }
            })}
          </td>
        ))} */}
      </tbody>
    </table>
  );
};
