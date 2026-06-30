import { Person } from '../types';
import cn from 'classnames';
import { Link } from 'react-router-dom';

type Props = {
  person: Person | string;
};

const getNameClass = (currentPerson: Person) => {
  const isWoman = currentPerson.sex === 'f';

  return cn({ 'has-text-danger': isWoman });
};

export const PersonLink: React.FC<Props> = ({ person }) => (
  <td>
    {typeof person === 'string' ? (
      person
    ) : (
      <Link className={getNameClass(person)} to={`/people/${person.slug}`}>
        {person.name}
      </Link>
    )}
  </td>
);
