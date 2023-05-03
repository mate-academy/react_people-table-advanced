import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person,
  motherLink: Person | null,
  fatherLink: Person | null,
  personSlug: string,
};

export const PersonLink: React.FC<Props> = ({
  person,
  motherLink,
  fatherLink,
  personSlug,
}) => {
  const {
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
    slug,
  } = person;

  return (
    <tr
      key={slug}
      data-cy="person"
      className={classNames({
        'has-background-warning': personSlug === slug,
      })}
    >
      <td>
        <NavLink
          to={`/people/${slug}`}
          className={classNames({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </NavLink>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {motherLink ? (
          <NavLink
            to={`/people/${motherLink.slug}`}
            className="has-text-danger"
          >
            {motherLink.name}
          </NavLink>
        ) : (
          motherName || '-'
        )}
      </td>
      <td>
        {fatherLink ? (
          <NavLink
            to={`/people/${fatherLink.slug}`}
          >
            {fatherLink.name}
          </NavLink>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
