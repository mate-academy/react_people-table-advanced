import classNames from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person | undefined,
};

export const PersonLink: FC<Props> = ({ person }) => (
  <Link to={`../${person?.slug}`} className={classNames({ 'has-text-danger': person?.sex === 'f' })}>
    {person?.name}
  </Link>
);
