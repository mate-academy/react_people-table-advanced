import React from 'react';
import { useParams } from 'react-router-dom';
import { People } from '../types/People';
import PersonName from './PersonName';

type Props = {
  person: People;
};

const PersonRow: React.FC<Props> = ({ person }) => {
  const userSlug = useParams();

  return (
    <tr style={userSlug.userSlug === person.slug
      ? { backgroundColor: '#e2e2e2' }
      : { borderColor: 'transparent' }}
    >
      <td><PersonName human={person} /></td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        <PersonName
          human={person.motherName}
        />
      </td>
      <td>
        <PersonName
          human={person.fatherName}
        />
      </td>

    </tr>
  );
};

export default PersonRow;
