import { Link, useLocation, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { Parents } from '../../types/Parents';

type Props = {
  person: Person;
  parents: Parents;
};

export const PersonItem: React.FC<Props> = ({ person, parents }) => {
  const { slug } = useParams();
  const { search } = useLocation();
  const { mother, father } = parents;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': person.slug === slug,
      })}
    >
      <td>
        <Link
          to={{
            pathname: `../people/${person.slug}`,
            search,
          }}
          className={person.sex === 'f' ? 'has-text-danger' : ''}
        >
          {person.name}
        </Link>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {mother
          ? (
            <Link
              to={{
                pathname: `/people/${mother?.slug || ''}`,
                search,
              }}
              className="has-text-danger"
            >
              {person.motherName || '-'}
            </Link>
          )
          : (
            <p>{person.motherName || '-'}</p>
          )}
      </td>

      <td>
        {father
          ? (
            <Link
              to={{
                pathname: `/people/${father?.slug || ''}`,
                search,
              }}
            >
              {person.fatherName || '-'}
            </Link>
          )
          : (
            <p>{person.fatherName || '-'}</p>
          )}
      </td>
    </tr>
  );
};
