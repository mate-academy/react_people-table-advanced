import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person;
  father?: Person;
  mother?: Person;
};

const PersonLink: React.FC<Props> = ({ person, mother, father }) => {
  const { slug } = useParams();
  const motherName = person.motherName ? person.motherName : '-';
  const fatherName = person.fatherName ? person.fatherName : '-';

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': person.slug === slug })}
    >
      <td>
        <Link
          className={classNames({ 'has-text-danger': person.sex === 'f' })}
          to={`../${person.slug}`}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {mother ? (
          <Link
            className={classNames({ 'has-text-danger': mother.sex === 'f' })}
            to={`../${mother.slug}`}
          >
            {mother.name}
          </Link>
        ) : (
          motherName
        )}
      </td>
      <td>
        {father ? (
          <Link to={`../${father.slug}`}>{father.name}</Link>
        ) : (
          fatherName
        )}
      </td>
    </tr>
  );
};

export default PersonLink;
