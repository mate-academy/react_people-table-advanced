import React from 'react';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { SortLink } from '../SortLink';

interface Peops {
  people: Person[]
  personSlug: string
}

export const PeopleTable: React.FC<Peops> = ({ people, personSlug }) => {
  const isSelected = (slug: string) => slug === personSlug;

  return (
    <table
      style={{ borderCollapse: 'collapse' }}
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <SortLink sortBy="name" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SortLink sortBy="sex" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SortLink sortBy="born" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SortLink sortBy="died" />
            </span>
          </th>

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
            motherName,
            mother,
            fatherName,
            father,
            slug,
          } = person;

          return (
            <tr
              key={slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': isSelected(slug),
              })}
            >
              <td>
                <PersonLink person={person} isSelected={isSelected} />
              </td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother
                  ? <PersonLink person={mother} isSelected={isSelected} />
                  : motherName || '-'}
              </td>
              <td>
                {father
                  ? <PersonLink person={father} isSelected={isSelected} />
                  : fatherName || '-'}
              </td>
            </tr>
          );
        })}

      </tbody>
    </table>
  );
};
