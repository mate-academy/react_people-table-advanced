import cn from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../../../types';

interface Props {
  person: Person,
}

const FEMALE_SEX = 'f';

export const PersonLink: React.FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{
        pathname: `../${person.slug}`,
        search: searchParams.toString(),
      }}
      className={cn({ 'has-text-danger': person.sex === FEMALE_SEX })}
    >
      {person.name}
    </Link>
  );
};
