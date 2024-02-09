import { Link, useLocation, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { Parents } from '../../types/Parents';
import { SexFilter } from '../../types/SexFilter';

type Props = {
  person: Person;
  parents: Parents;
};

export const PersonItem: React.FC<Props> = ({ person, parents }) => {
  const {
    motherName,
    fatherName,
    born,
    died,
    name,
    sex,
    slug: personSlug,
  } = person;
  const { slug } = useParams();
  const { search } = useLocation();
  const { mother, father } = parents;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': personSlug === slug,
      })}
    >
      <td>
        <Link
          to={{
            pathname: `../people/${personSlug}`,
            search,
          }}
          className={classNames({
            'has-text-danger': sex === SexFilter.female,
          })}
        >
          {name}
        </Link>
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
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
              {motherName || '-'}
            </Link>
          )
          : (
            <p>{motherName || '-'}</p>
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
              {fatherName || '-'}
            </Link>
          )
          : (
            <p>{fatherName || '-'}</p>
          )}
      </td>
    </tr>
  );
};
