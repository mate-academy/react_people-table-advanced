import classNames from 'classnames';
import { Person } from '../../types';
import { useParams } from 'react-router-dom';
import { PersonLink } from '../PersonLink';

type Props = {
  person: Person;
};
export const TablePerson: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();
  const { name, sex, born, died, motherName, fatherName, mother, father } =
    person;

  return (
    <tr
      data-cy="person"
      className={classNames('', {
        'has-background-warning': person.slug === slug,
      })}
    >
      <td>
        <PersonLink person={person} name={name} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <PersonLink person={mother} name={motherName} />
        ) : (
          motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <PersonLink person={father} name={fatherName} />
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
