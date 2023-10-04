import cn from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

const FEMALE = 'f';
const FEMALE_COLOR = 'has-text-danger';
const MALE_COLOR = 'has-text-link';

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
        [person.sex === FEMALE ? FEMALE_COLOR : MALE_COLOR]: '',
      })}
    >
      {person.name}
    </Link>
  );
};
