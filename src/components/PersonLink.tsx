import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

type Props = {
  person: Person;
  people: Person[];
};
export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { sex, born, died, name, motherName, fatherName } = person;

  const { slug } = useParams();

  const showMotherName = motherName || '-';

  const showFatherName = fatherName || '-';

  const motherSlug = people.find(human => human.name === motherName)?.slug;

  const fatherSlug = people.find(human => human.name === fatherName)?.slug;

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': person.slug === slug })}
    >
      <td>
        <Link
          className={classNames({ 'has-text-danger': sex === 'f' })}
          to={`/people/${person.slug}`}
        >
          {name}
        </Link>
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {motherSlug ? (
          <Link className="has-text-danger" to={`/people/${motherSlug}`}>
            {showMotherName}
          </Link>
        ) : (
          showMotherName
        )}
      </td>

      <td>
        {fatherSlug ? (
          <Link to={`/people/${fatherSlug}`}>{showFatherName}</Link>
        ) : (
          showFatherName
        )}
      </td>
    </tr>
  );
};
