import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../../../types';

type Props = {
  person: Person
};

export const PersonLink:React.FC<Props> = ({ person }) => {
  const { name, slug } = person;

  return (
    <Link
      to={`/people/${slug}`}
      className={classNames({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {name}
    </Link>
  );
};
