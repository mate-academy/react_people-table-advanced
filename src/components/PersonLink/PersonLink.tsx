import { FC } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types/Person';
import { WOMAN } from '../../constants';

type Props = {
  person: Person;
};

export const PersonLink: FC<Props> = ({ person }) => {
  const { name, slug, sex } = person;

  return (
    <Link
      to={`../${slug}`}
      className={cn(
        { 'has-text-danger': sex === WOMAN },
      )}
    >
      {name}
    </Link>
  );
};
