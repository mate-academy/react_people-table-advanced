import React, { } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { PersonName } from './PersonName';
import { People } from '../../types/People';

type Props = {
  person: People;
};

export const TrPerson: React.FC<Props> = React.memo(({ person }) => {
  const { slug } = useParams();

  return (
    <tr
      key={person.name}
      className={classNames(
        'tr',
        {
          'tr--f': person.sex === 'f' && person.slug === slug,
          'tr--m': person.sex === 'm' && person.slug === slug,
        },
      )}
      id={person.slug}
    >
      <td>{person.name}</td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {
          person.father
            ? (
              <PersonName
                slug={person.father.slug}
                personName={person.fatherName}
              />
            ) : <b>{person.fatherName || '---'}</b>
        }
      </td>
      <td>
        {
          person.mother
            ? (
              <PersonName
                slug={person.mother.slug}
                personName={person.motherName}
              />
            ) : <b>{person.mother || '---'}</b>
        }
      </td>
    </tr>
  );
});
