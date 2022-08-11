import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../../../types/Person';

interface Props {
  person: Person,
}

export const PersonLink: FC<Props> = ({ person }) => {
  const { search } = useLocation();
  const linkColor = ({ sex }: Person) => {
    switch (sex) {
      case 'm':
        return { color: 'rgb(0, 71, 171)' };

      case 'f':
        return { color: 'rgb(255, 0, 0)' };

      default:
        return { color: 'inherit' };
    }
  };

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search: `${search}`,
      }}
      style={linkColor(person)}
    >
      {person.name}
    </Link>
  );
};
