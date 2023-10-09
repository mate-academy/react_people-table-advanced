import cn from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { SEX_FEMALE, SEX_MALE } from '../utils/constants';

type Props = {
  person: Person
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{
        pathname: `${person.slug}`,
        search: searchParams.toString(),
      }}
      className={cn({
        'has-text-danger': person.sex === SEX_FEMALE,
        'has-text-link': person.sex === SEX_MALE,
      })}
    >
      {person.name}
    </Link>
  );
};
