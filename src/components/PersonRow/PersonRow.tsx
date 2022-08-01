import React from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';

import { Child } from '../../types/human';
import { PersonName } from '../PersonName';

type Props = {
  person: Child;
};

function getTextColorBySex(sex: 'f' | 'm') {
  return sex === 'm' ? 'rgb(0, 71, 171)' : 'rgb(255, 0, 0)';
}

export const PersonRow: React.FC<Props> = React.memo(
  ({ person }) => {
    const { personSlug } = useParams<{ personSlug: string }>();

    return (
      <tr
        key={person.name}
        className={classNames('Person')}
        style={personSlug === person.slug
          ? { backgroundColor: 'green' } : {}}
      >
        <th style={{ color: getTextColorBySex(person.sex) }}>
          <PersonName name={person.name} personSlug={person.slug} />
        </th>
        <th>{person.sex}</th>
        <th>{person.born}</th>
        <th>{person.died}</th>
        <th style={{
          color: person.mother
            ? getTextColorBySex(person.mother.sex)
            : 'black',
        }}
        >
          {person.mother ? (
            <PersonName
              name={person.mother.name}
              personSlug={person.mother.slug}
            />
          ) : <b>{person.motherName}</b>}
        </th>
        <th style={{
          color: person.father
            ? getTextColorBySex(person.father.sex)
            : 'black',
        }}
        >
          {person.father ? (
            <PersonName
              name={person.father.name}
              personSlug={person.father.slug}
            />
          ) : <b>{person.fatherName}</b>}
        </th>
      </tr>
    );
  },
);
