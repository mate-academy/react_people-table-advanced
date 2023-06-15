import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../../../../types';

type Props = {
  person : Person;
};

export const PeopleItem: React.FC<Props> = ({ person }) => {
  const { pathname } = useLocation();

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
        { 'has-background-warning': pathname.includes(person.slug) },
      )}
    >
      <td>
        <Link
          to={`/people/${slug}`}
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
              to={`/people/${mother.slug}`}
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
            <Link to={`/people/${father.slug}`}>
              {fatherName}
            </Link>
          )
          : fatherName}
      </td>
    </tr>
  );
};
