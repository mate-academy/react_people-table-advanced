import React from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import { Person } from '../types';

type PeopleInfoProps = {
  people: Person[];
};

export const PersonInfo: React.FC<PeopleInfoProps> = ({ people }) => {
  const { slug } = useParams();

  return (
    <tbody>
      {people.map(
        ({
          name,
          sex,
          born,
          died,
          fatherName,
          motherName,
          slug: personSlug,
          mother,
          father,
        }) => (
          <tr
            data-cy="person"
            key={personSlug}
            className={classNames({
              'has-background-warning': personSlug === slug,
            })}
          >
            <td>
              <PersonLink
                person={{
                  name,
                  sex,
                  born,
                  died,
                  fatherName,
                  motherName,
                  slug: personSlug,
                }}
              />
            </td>

            <td>{sex}</td>
            <td>{born}</td>
            <td>{died}</td>
            <td>
              {mother ? <PersonLink person={mother} /> : motherName || '-'}
            </td>
            <td>
              {father ? <PersonLink person={father} /> : fatherName || '-'}
            </td>
          </tr>
        ),
      )}
    </tbody>
  );
};
