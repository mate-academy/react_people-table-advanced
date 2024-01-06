import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';

type Props = {
  currentPerson: Person;
};

export const PersonLink: React.FC<Props> = ({ currentPerson }) => {
  const [searchParams] = useSearchParams();

  const { name, sex, slug } = currentPerson;

  return (
    <Link
      to={{
        pathname: `/people/${slug}`,
        search: searchParams.toString(),
      }}
      className={cn({ 'has-text-danger ': sex === 'f' })}
    >
      {name}
    </Link>
  );
};
