import React from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';

import { Person } from '../../types';
import { EMPTY_FIELD } from '../../utils/constants';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTableBody: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();

  return (
    <tbody>
      {people.map(person => {
        const {
          slug,
          sex,
          born,
          died,
          motherName,
          mother,
          fatherName,
          father,
        } = person;

        return (
          <tr
            key={slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': slug === personSlug,
            })}
          >
            <td>
              <PersonLink
                person={person}
              />
            </td>

            <td>{sex}</td>
            <td>{born}</td>
            <td>{died}</td>

            <td>
              {mother
                ? (
                  <PersonLink
                    person={mother}
                  />
                )
                : (
                  motherName || EMPTY_FIELD
                )}
            </td>

            <td>
              {father
                ? (
                  <PersonLink
                    person={father}
                  />
                )
                : (
                  fatherName || EMPTY_FIELD
                )}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};
