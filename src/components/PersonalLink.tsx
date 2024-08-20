import { Link } from 'react-router-dom';
import { Person } from '../types';
import cn from 'classnames';

type Props = {
  person: Person;
  onClick: (slug: string) => void;
};

const FEMALE = 'f';

export const PersonLink: React.FC<Props> = ({ person, onClick }) => {
  const { slug, name, sex } = person;

  if (!person) {
    return <span>-</span>;
  }

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onClick(slug);
  };

  return (
    <Link
      to={`/people/${slug}`}
      onClick={handleClick}
      className={cn({
        'has-text-danger': sex === FEMALE,
      })}
    >
      {name}
    </Link>
  );
};
