import { Link, useNavigate } from 'react-router-dom';
import { Person } from '../types/Person';
import classNames from 'classnames';

interface Props {
  person: Person;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    navigate(`/people/${person.slug}`, { replace: true });
  };

  return (
    <Link
      to={`/people/${person.slug}`}
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
      onClick={handleClick}
    >
      {person.name}
    </Link>
  );
};
