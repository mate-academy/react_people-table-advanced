import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person,
};

export const PersonLink:React.FC<Props> = ({ person }) => {
  const personName = person?.name || '-';

  return (
    <Link
      to={`/people/${person?.slug}`}
      className={classNames({
        'has-text-danger': person?.sex === 'f',
      })}
    >
      {personName}
    </Link>
  );
};
