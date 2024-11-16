import classNames from 'classnames';
import { Person } from '../types';
import { useLocation, useNavigate } from 'react-router-dom';

type PeopleLinkProps = {
  person: Person | null;
  searchParams: string;
};

export const PersonLink: React.FC<PeopleLinkProps> = ({
  person,
  searchParams,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  if (!person) {
    return <>{'-'}</>;
  }

  const handleNavigateWithParams = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string,
  ) => {
    e.preventDefault();
    navigate(`${path}${location.search}`);
  };

  return (
    <a
      href={`#/people/${person.slug}${searchParams}`}
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
      onClick={e => handleNavigateWithParams(e, `/people/${person.slug}`)}
    >
      {person.name}
    </a>
  );
};
