import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person?: Person,
  name: string | null,
};

export const PersonLink: React.FC<Props> = ({
  person, name,
}) => {
  return (
    <td>
      <Link
        to={`/people/${person?.slug}`}
        className={classNames({ 'has-text-danger': person?.sex === 'f' })}
      >
        {name}
      </Link>
    </td>
  );
};
