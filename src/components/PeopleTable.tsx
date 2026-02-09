import React from 'react';
import { Person } from '../types';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { SortLink } from './SortLink';

type Props = {
  people: Person[];
  selectedPersonSlug: string | null;
  peopleByName: Map<string, Person>;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedPersonSlug,
  peopleByName,
}) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <SortLink field="name" label="Name" />
          </th>

          <th>
            <SortLink field="sex" label="Sex" />
          </th>

          <th>
            <SortLink field="born" label="Born" />
          </th>

          <th>
            <SortLink field="died" label="Died" />
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(human => {
          const normalizeName = (name: string) => name.trim().toLowerCase();

          const motherPerson = human.motherName
            ? (peopleByName.get(normalizeName(human.motherName)) ?? null)
            : null;

          const fatherPerson = human.fatherName
            ? (peopleByName.get(normalizeName(human.fatherName)) ?? null)
            : null;

          return (
            <tr
              key={human.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': human.slug === selectedPersonSlug,
              })}
            >
              <td>
                <PersonLink person={human} />
              </td>

              <td>{human.sex}</td>
              <td>{human.born}</td>
              <td>{human.died}</td>

              <td>
                {human.motherName ? (
                  motherPerson ? (
                    <PersonLink person={motherPerson} />
                  ) : (
                    human.motherName
                  )
                ) : (
                  '-'
                )}
              </td>

              <td>
                {human.fatherName ? (
                  fatherPerson ? (
                    <PersonLink person={fatherPerson} />
                  ) : (
                    human.fatherName
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
