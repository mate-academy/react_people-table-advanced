import { NavLink, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Sex } from '../types/Sex';
import { Person } from '../types';

interface PersonLinkProps {
  person: Person;
}

export const PersonLink: React.FC<PersonLinkProps> = ({ person }) => {
  const [searchParams] = useSearchParams();

  return (
    <>
      <NavLink
        to={{
          pathname: `/people/${person.slug}`,
          search: searchParams.toString(),
        }}
        className={classNames({
          'has-text-danger': person.sex === Sex.Female,
        })}
      >
        {person.name}
      </NavLink>
    </>
  );
};
