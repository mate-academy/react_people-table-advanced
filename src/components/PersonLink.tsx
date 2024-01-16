import { Link, useLocation, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person ;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { personSlug: selectedUser } = useParams();

  const { search } = useLocation();

  const getClassForWomen
    = (personSex: string | undefined): string | undefined => {
      return personSex === 'f' ? 'has-text-danger' : '';
    };

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': person.slug === selectedUser,
      })}
    >
      <td>
        <Link
          className={getClassForWomen(person.sex)}
          to={{
            pathname: `../${person.slug}`,
            search,
          }}
        >
          {person.name}
        </Link>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      {!person.mother?.name
        ? (
          <td>
            {person.motherName || '-'}
          </td>
        )
        : (
          <td>
            <Link
              className={getClassForWomen(person.mother?.sex)}
              to={{
                pathname: `../${person.mother?.slug}`,
                search,
              }}
            >
              {person.motherName || '-'}
            </Link>
          </td>
        )}
      {!person.father?.name
        ? (
          <td>
            {person.fatherName || '-'}
          </td>
        )
        : (
          <td>
            <Link
              className={getClassForWomen(person.father?.sex)}
              to={{
                pathname: `../${person.father?.slug}`,
                search,
              }}
            >
              {person.fatherName || '-'}
            </Link>
          </td>
        )}
    </tr>
  );
};
