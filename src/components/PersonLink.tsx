import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { Person, Sex } from '../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = memo(({ person }) => {
  const { search } = useLocation();

  const { slug, name, sex } = person;

  return (
    <Link
      to={{ pathname: `../${slug}`, search }}
      className={classNames({
        'has-text-danger': sex === Sex.Female,
      })}
    >
      {name}
    </Link>
  );
});
