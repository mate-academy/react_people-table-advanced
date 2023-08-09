import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person,
  findParent: (name: string | null) => Person | null,
};

export const PersonInfo:React.FC<Props> = ({ person, findParent }) => {
  const { personId } = useParams();

  const mother = findParent(person?.motherName || null);
  const father = findParent(person?.fatherName || null);

  const momName = person?.motherName || '-';
  const dadName = person?.fatherName || '-';

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': personId === person?.slug,
      })}
    >
      <td key={person?.slug}>
        <PersonLink person={person} />
      </td>

      <td>{person?.sex}</td>
      <td>{person?.born}</td>
      <td>{person?.died}</td>
      <td>
        {mother ? (
          <PersonLink person={mother} />
        ) : (
          momName
        )}
      </td>

      <td>
        {father ? (
          <PersonLink person={father} />
        ) : (
          dadName
        )}
      </td>
    </tr>
  );
};
