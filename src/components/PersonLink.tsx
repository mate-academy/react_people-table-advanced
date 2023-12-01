import { Link } from 'react-router-dom';
import { Person } from '../types';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';

interface Props {
  person: Person;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  if (!person) {
    return null;
  }

  const { name, sex } = person;
  const linkClass = sex === 'f'
    ? 'has-text-danger'
    : '';

  return (
    <Link to={`${person?.slug}`} className={linkClass}>
      {name}
    </Link>
  );
};
