import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  person: Person;
};

export const PersonInfo: React.FC<Props> = ({ person }) => {
  const {
    sex,
    born,
    died,
    mother,
    father,
  } = person;

  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': slug === person.slug })}
    >
      <td>
        <PersonLink person={person} />
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother
          ? <PersonLink person={mother} />
          : (person.motherName || '-') }
      </td>
      <td>
        {father
          ? <PersonLink person={father} />
          : (person.fatherName || '-') }
      </td>
    </tr>
  );
};
