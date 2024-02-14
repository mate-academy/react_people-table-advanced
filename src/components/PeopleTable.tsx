/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext } from 'react';
import classNames from 'classnames';

import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { PeopleContext } from '../Context';
import { SortLink } from './SortLink';

export const PeopleTable: React.FC<{
  slug: string | undefined
}> = ({ slug }) => {
  const {
    filteredPeople,
    existingPerson,
  } = useContext(PeopleContext);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <SortLink field="name" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SortLink field="sex" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SortLink field="born" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SortLink field="died" />
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredPeople.map((person) => (
          <tr
            data-cy="person"
            className={classNames({
              'has-background-warning':
                person.slug === slug,
            })}
            key={person.slug}
          >
            <td>
              {existingPerson(person.name) ? (
                <PersonLink person={person} />
              ) : (
                person.name
              )}
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {(() => {
                const { motherName } = person;

                if (existingPerson(motherName)) {
                  return (
                    <PersonLink
                      person={existingPerson(motherName) as Person}
                    />
                  );
                }

                if (existingPerson(motherName) === null) {
                  return '-';
                }

                return motherName;
              })()}
            </td>
            <td>
              {(() => {
                const { fatherName } = person;

                if (existingPerson(fatherName)) {
                  return (
                    <PersonLink
                      person={existingPerson(fatherName) as Person}
                    />
                  );
                }

                if (existingPerson(fatherName) === null) {
                  return '-';
                }

                return fatherName;
              })()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
