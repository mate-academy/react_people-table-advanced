import { NavLink } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person,
  setSelectedPersonSlug: (slug: string) => void,
};

export const PersonLink: React.FC<Props> = ({
  person,
  setSelectedPersonSlug,
}) => {
  const {
    name,
    slug,
    sex,
  } = person;

  const getLinkClass = () => {
    if (sex === 'f') {
      return 'has-text-danger';
    }

    return '';
  };

  return (
    <NavLink
      to={slug}
      onClick={() => setSelectedPersonSlug(slug)}
      className={getLinkClass}
    >
      {name}
    </NavLink>
  );
};
