import './PersonName.scss';
import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person,
};

export const PersonName: React.FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={`/people/${person.slug}?${searchParams.toString()}`}
      className={classNames({
        female: person.sex === 'f',
        male: person.sex === 'm',
      })}
    >
      {person.name}
    </Link>
  );
};
