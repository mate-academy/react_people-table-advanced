import { Link, useLocation, useParams } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';

type Props = {
  person: Person;
  findInList: (name: string) => Person | undefined;
};

export const PersonLink: React.FC<Props> = ({ person, findInList }) => {
  const { search } = useLocation();

  const {
    slug: personSlug,
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
  } = person;

  const { slug } = useParams();

  const mother = findInList(motherName || '');
  const father = findInList(fatherName || '');

  return (
    <tr
      key={personSlug}
      data-cy="person"
      className={classNames({ 'has-background-warning': personSlug === slug })}
    >
      <td>
        <Link
          to={{ pathname: `/people/${personSlug}`, search }}
          className={classNames({
            'has-text-danger': sex === 'f',
          })}
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
              className="has-text-danger"
              to={{ pathname: `/people/${mother.slug}`, search }}
            >
              {motherName}
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
            <Link to={{ pathname: `/people/${father.slug}`, search }}>
              {fatherName}
            </Link>
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
