import { NavLink } from 'react-router-dom';
import { Person, Sex } from '../types';
import cn from 'classnames';
import { NO_PARENT } from '../constans/personConstants';

type PersonProps = {
  person: Person;
  currentSlug: string;
};

export const PersonTableRow: React.FC<PersonProps> = ({
  person,
  currentSlug,
}) => {
  const {
    slug,
    name,
    sex,
    born,
    died,
    mother,
    father,
    motherName,
    fatherName,
  } = person;

  return (
    <>
      <tr
        data-cy="person"
        key={slug}
        className={cn({ 'has-background-warning': slug === currentSlug })}
      >
        <td>
          <NavLink
            to={`/people/${slug}`}
            className={cn({
              'has-text-danger': sex === Sex.Female,
            })}
          >
            {name}
          </NavLink>
        </td>

        <td>{sex}</td>

        <td>{born}</td>

        <td>{died}</td>

        <td>
          {mother ? (
            <NavLink to={`/people/${mother.slug}`} className="has-text-danger">
              {mother.name}
            </NavLink>
          ) : (
            motherName || NO_PARENT
          )}
        </td>

        <td>
          {father ? (
            <NavLink to={`/people/${father.slug}`}>{father.name}</NavLink>
          ) : (
            fatherName || NO_PARENT
          )}
        </td>
      </tr>
    </>
  );
};
