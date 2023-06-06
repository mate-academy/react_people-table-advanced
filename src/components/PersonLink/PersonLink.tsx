import { FC } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person
};

export const PersonLink: FC<Props> = ({
  person: { slug, sex, name },
}) => (
  <Link
    to={`/people/${slug}`}
    className={classNames(
      { 'has-text-danger': sex === 'f' },
    )}
  >
    {name}
  </Link>
);
