import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { SEX_FILTER } from '../utils/constants';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{
        pathname: `../${person.slug}`,
        search: searchParams.toString(),
      }}
      className={classNames({
        'has-text-danger': person.sex === SEX_FILTER.Female,
      })}
    >
      {person.name}
    </Link>
  );
};
