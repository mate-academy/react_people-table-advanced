import { Link } from 'react-router-dom';
import { FC } from 'react';
import classNames from 'classnames';
import { Person } from '../../types';
import { PageRouters } from '../../types/PageRouters';

type Props = {
  person: Person,
};

export const PersonLink: FC<Props> = ({ person }) => {
  const { sex, name, slug } = person;

  return (
    <Link
      className={classNames(
        { 'has-text-danger': sex === 'f' },
      )}
      to={`${PageRouters.people}/${slug}`}
    >
      {name}
    </Link>
  );
};
