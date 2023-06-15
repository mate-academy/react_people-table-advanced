import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../../../../types';

type Props = {
  person : Person;
};

export const PersonBlock: React.FC<Props> = ({ person }) => {
  const location = useLocation();

  const {
    name,
    died,
    born,
    motherName,
    fatherName,
    father,
    mother,
    slug,
    sex,
  } = person;

  return (
    <tr
      data-cy="person"
      key={name}
      className={classNames(
        { 'has-background-warning': location.pathname.includes(person.slug) },
      )}
    >
      <td>
        <Link
          to={{
            pathname: `/people/${slug}`,
            search: location.search,
          }}
          className={classNames(
            { 'has-text-danger': sex === 'f' },
          )}
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
                pathname: `/people/${mother.slug}`,
                search: location.search,
              }}
              className="has-text-danger"
            >
              {motherName}
            </Link>
          )
          : motherName}
      </td>
      <td>
        {father
          ? (
            <Link to={{
              pathname: `/people/${father.slug}`,
              search: location.search,
            }}
            >
              {fatherName}
            </Link>
          )
          : fatherName}
      </td>
    </tr>
  );
};
