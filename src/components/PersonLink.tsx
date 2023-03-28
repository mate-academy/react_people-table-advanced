import { Link, useLocation, useResolvedPath } from 'react-router-dom';
import { Person } from '../types';

type PersonLinkProps = {
  person: Person,
};

export const PersonLink: React.FC<PersonLinkProps> = ({
  person,
}) => {
  const { search } = useLocation();
  const parentPath = useResolvedPath('..').pathname;
  const { sex, name, slug } = person;

  return (
    <Link
      className={sex === 'f'
        ? 'has-text-danger'
        : ''}
      to={{
        pathname: `${parentPath}/${slug}`,
        search,
      }}
    >
      {name}
    </Link>
  );
};
