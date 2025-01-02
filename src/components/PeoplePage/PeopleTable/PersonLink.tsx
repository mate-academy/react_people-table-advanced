import React from 'react';
import cn from 'classnames';
import { Person } from '../../../types';
import { Link, useLocation } from 'react-router-dom';
import { Gender } from '../../../types/Genger';

type Props = Pick<Person, 'name' | 'slug' | 'sex'>;

export const PersonLink: React.FC<Props> = props => {
  const { name, slug, sex } = props;
  const { search } = useLocation();

  return (
    <Link
      className={cn({ 'has-text-danger': sex === Gender.Female })}
      to={{ pathname: `../${slug}`, search }}
    >
      {name}
    </Link>
  );
};
