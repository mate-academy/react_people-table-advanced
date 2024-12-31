import { Person } from '../types';
import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

type Props = {
  person: Person;
};

export const PersonLinkItem: React.FC<Props> = ({
  person: { name, sex, slug },
}) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={slug + '?' + searchParams.toString()}
      className={cn({ 'has-text-danger': sex === 'f' })}
    >
      {name}
    </Link>
  );
};
