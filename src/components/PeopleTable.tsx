import React from 'react';
import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import PersonLink from './PersoneLink';
import { SortLink } from './SortLink';
import { SortTypes } from '../types/SortTypes';

interface Props {
  people: Person[],
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personeSlug = '' } = useParams();
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const handleSortPeople = () => {
    const sortPeople = [...people].sort((prevPerson, nextPersone) => {
      switch (sort) {
        case SortTypes.Name:
        case SortTypes.Sex:
          return prevPerson[sort].localeCompare(nextPersone[sort]);
        case SortTypes.Born:
        case SortTypes.Died:
          return prevPerson[sort] - nextPersone[sort];
        default: {
          return 0;
        }
      }
    });

    return order === 'desc' ? sortPeople.reverse() : sortPeople;
  };

  const sortedPeople = handleSortPeople();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <SortLink title="Name" />
          </th>

          <th>
            <SortLink title="Sex" />
          </th>

          <th>
            <SortLink title="Born" />
          </th>

          <th>
            <SortLink title="Died" />
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map((persone: Person) => {
          const {
            sex,
            born,
            died,
            motherName,
            fatherName,
            slug,
            mother,
            father,
          } = persone;

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames(
                { 'has-background-warning': personeSlug === slug },
              )}
            >
              <td>
                <PersonLink person={persone} />
              </td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother ? (
                  <PersonLink person={mother} />
                ) : (
                  motherName || '-'
                )}
              </td>

              <td>
                {father ? (
                  <PersonLink person={father} />
                ) : (
                  fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
