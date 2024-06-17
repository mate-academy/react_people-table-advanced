import { Link, useLocation, useParams } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';

type Props = {
  person: Person;
  mother: Person | undefined;
  father: Person | undefined;
};

export const PersonLink: React.FC<Props> = ({ person, mother, father }) => {
  const { name, sex, born, died, fatherName, motherName, slug } = person;
  const { search } = useLocation();

  const { selectedSlug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': selectedSlug === slug,
      })}
    >
      <td>
        <Link
          to={`/people/${slug}${search}`}
          className={classNames({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {motherName ? (
          mother ? (
            <Link
              to={`/people/${mother.slug}${search}`}
              className="has-text-danger"
            >
              {mother.name}
            </Link>
          ) : (
            motherName
          )
        ) : (
          '-'
        )}
      </td>
      <td>
        {fatherName ? (
          father ? (
            <Link to={`/people/${father.slug}${search}`}>{father.name}</Link>
          ) : (
            fatherName
          )
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};
