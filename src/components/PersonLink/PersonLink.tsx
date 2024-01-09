import { Link } from 'react-router-dom';
import cn from 'classnames';
import { FC } from 'react';

type Props = {
  sex: string,
  slug: string,
  name: string
};

export const PersonLink: FC<Props> = ({
  sex,
  slug,
  name,
}) => {
  return (
    <Link
      className={cn({ 'has-text-danger': sex === 'f' })}
      to={`../${slug}`}
    >
      {name}
    </Link>
  );
};
