import { Link } from 'react-router-dom';
import { Person } from '../../types/Person';
import classNames from 'classnames';

type Props = {
  person?: Person;
  name?: string;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, name, people }) => {
  const target = person ?? people.find(p => p.name === name);

  if (!target) {
    return <span>{name}</span>;
  }

  return (
    <Link
      to={`/people/${target.slug}`}
      className={classNames({
        'has-text-danger': target.sex === 'f',
      })}
    >
      {target.name}
    </Link>
  );
};
