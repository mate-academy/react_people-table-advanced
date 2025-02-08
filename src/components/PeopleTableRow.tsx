import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { Fallback } from './Fallback';

type Props = {
  person: Person;
};

export const PeopleTableRow: React.FC<Props> = ({ person }) => {
  const { activeSlug } = useParams();

  const { sex, born, died, mother, motherName, father, fatherName, slug } =
    person;

  return (
    <tr
      data-cy="person"
      className={activeSlug === slug ? 'has-background-warning' : ''}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        <Fallback fallback={motherName}>
          {mother && <PersonLink person={mother} />}
        </Fallback>
      </td>
      <td>
        <Fallback fallback={fatherName}>
          {father && <PersonLink person={father} />}
        </Fallback>
      </td>
    </tr>
  );
};
