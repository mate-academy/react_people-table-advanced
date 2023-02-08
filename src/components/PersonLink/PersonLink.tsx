import cn from 'classnames';
import { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

interface Props {
  person?: Person | null,
}

export const PersonLink: FC<Props> = memo(
  ({ person }) => {
    const {
      name = '-',
      slug = '',
      sex = '',
    } = person as Person;

    const isWoman = sex === 'f';

    return (
      <Link className={cn({ 'has-text-danger': isWoman })} to={`/people/${slug}`}>
        {name}
      </Link>
    );
  },
);
