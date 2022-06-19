import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { DataContext } from '../context/DataProvider';
import { Person } from '../types/Person';
import PersonName from './PersonName';

type Props = {
  person: Person
};

const PersonRow: React.FC<Props> = ({ person }) => {
  const { personSlug } = useParams();
  const { peopleList } = useContext(DataContext);

  const father = peopleList.find(vater => vater.name === person.fatherName);
  const mother = peopleList.find(mutter => mutter.name === person.motherName);

  return (
    <tr style={person.slug === personSlug ? { backgroundColor: '#aed6f1' }
      : { backgroundColor: 'white' }}
    >
      <td>
        <PersonName person={person} />
      </td>
      <td>
        {person.sex}
      </td>
      <td>
        {person.born}
      </td>
      <td>
        {person.died}
      </td>
      <td>
        {father
          ? <PersonName person={father} />
          : person.fatherName || '-'}
      </td>
      <td>
        {mother
          ? <PersonName person={mother} />
          : person.motherName || '-'}
      </td>
    </tr>
  );
};

export default PersonRow;
