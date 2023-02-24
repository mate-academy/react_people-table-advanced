import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types/Person';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, slug } = person;
  const isWomen = person.sex === 'f';

  return (
    <Link
      to={slug}
      className={classNames('', {
        'has-text-danger': isWomen,
      })}
    >
      {name}
    </Link>
  );
};
