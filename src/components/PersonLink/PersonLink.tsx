import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person;
  search: URLSearchParams;
};

export const PersonLink: React.FC<Props> = ({ person, search }) => (
  <Link
    to={{ pathname: `/people/${person.slug}`, search: search.toString() }}
    className={classNames({
      'has-text-danger': person.sex === 'f',
    })}
  >
    {person.name}
  </Link>
);
