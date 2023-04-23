import { FC } from 'react';
import {Link, useLocation} from 'react-router-dom';
import classNames from 'classnames';
import {Person} from "../types";

interface Props {
  person: Person,
}

export const PersonLink: FC<Props> = ({ person }) => {
  const location = useLocation();

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search: location.search,
      }}
      className={classNames({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </Link>
  );
};
