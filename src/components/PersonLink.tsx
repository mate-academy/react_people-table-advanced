import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person | undefined,
  name: string | null,
  sex: string,
};

export const PersonLink: React.FC<Props> = ({
  person, name, sex,
}) => {
  return (
    <td>
      <Link
        to={`/people/${person?.slug}`}
        className={classNames({ 'has-text-danger': sex === 'f' })}
      >
        {name}
      </Link>
    </td>
  );
};
