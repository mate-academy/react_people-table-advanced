import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';

interface Props {
  person: Person | undefined,
}

export const PersonLink:React.FC<Props> = ({ person }) => {
  const location = useLocation();

  const UrlWithSearch = `../people/${person?.slug}${location.search}`;

  return (
    <Link
      to={UrlWithSearch}
      className={cn({ 'has-text-danger': person?.sex === 'f' })}
    >
      {person?.name}
    </Link>
  );
};
