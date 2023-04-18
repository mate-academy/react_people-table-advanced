import { FC } from 'react';
import classNames from 'classnames';

import { Person } from '../types';
import { findParent } from '../helpers';
import { PeopleLink } from './PeopleLink';
import { SortType } from '../enums/SortType';
import { SortLink } from './SortLink';

type Props = {
  people: Person[],
  personId: string,
};

export const PeopleTable: FC<Props> = (props) => {
  const {
    people,
    personId,
  } = props;

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {[...Object.keys(SortType)]
            .filter((type) => type.toLowerCase() !== SortType.NONE)
            .map((type) => (
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  {type.slice(0, 1) + type.slice(1).toLowerCase()}

                  <SortLink typeOfSort={type.toLowerCase()} />
                </span>
              </th>
            ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map((person) => {
          const {
            sex,
            born,
            died,
            motherName,
            fatherName,
            slug,
          } = person;

          const motherOfPerson = findParent(people, motherName);
          const fatherOfPerson = findParent(people, fatherName);

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames({
                'has-background-warning': slug === personId,
              })}
            >
              <td>
                <PeopleLink person={person} />
              </td>

              <td>{sex}</td>

              <td>{born}</td>

              <td>{died}</td>

              <td>
                {motherOfPerson ? (
                  <PeopleLink person={motherOfPerson} />
                ) : (
                  motherName || '-'
                )}
              </td>

              <td>
                {fatherOfPerson ? (
                  <PeopleLink person={fatherOfPerson} />
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
