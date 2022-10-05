import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person
};

export const PersonalLink: React.FC<Props> = ({ person }) => {
  const { search } = useLocation();

  return (
    <>
      {person.slug
        ? (
          <Link
            className={classNames({ 'has-text-danger': person.sex === 'f' })}
            to={{
              pathname: `/people/${person.slug}`,
              search,
            }}
          >
            {person.name}
          </Link>
        )
        : person.name}
    </>
  );
};
