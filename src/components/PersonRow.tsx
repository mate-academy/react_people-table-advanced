import React from 'react';
import { useLocation } from 'react-router';
import { PersonName } from './PersonName';

export type Person = {
  [key: string]: string;
};

export const PersonRow = React.memo((props: {
  person: Person;
  mother: Person | undefined;
  father: Person | undefined;
}) => {
  const { pathname, search } = useLocation();
  const {
    name, sex, born, died, motherName, fatherName, slug,
  } = props.person;
  const { mother, father } = props;

  return (
    <tr className="Person" style={{ backgroundColor: pathname.includes(slug) ? 'yellow' : '' }}>
      <td
        style={{
          backgroundColor: search.includes('name') ? '#c0c0c0' : '',
        }}
      >
        <PersonName
          name={name}
          sex={sex}
          slug={slug}
        />
      </td>
      <td
        style={{
          backgroundColor: search.includes('sex') ? '#c0c0c0' : '',
        }}
      >
        {sex}
      </td>
      <td
        style={{
          backgroundColor: search.includes('born') ? '#c0c0c0' : '',
        }}
      >
        {born}
      </td>
      <td
        style={{
          backgroundColor: search.includes('died') ? '#c0c0c0' : '',
        }}
      >
        {died}
      </td>
      <td>
        <PersonName
          name={mother ? mother.name : motherName}
          sex={mother ? mother.sex : ''}
          slug={mother ? mother.slug : ''}
        />
      </td>
      <td>
        <PersonName
          name={father ? father.name : fatherName}
          sex={father ? father.sex : ''}
          slug={father ? father.slug : ''}
        />
      </td>
    </tr>
  );
});
