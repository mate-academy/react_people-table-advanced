import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';

interface ParentLinkProps {
  parentName: string | null;
  people: Person[];
}

export const ParentLink: React.FC<ParentLinkProps> = ({
  parentName,
  people,
}) => {
  const location = useLocation();

  if (!parentName) {
    return <>-</>;
  }

  const parentPerson = people.find((p) => p.name === parentName);

  if (parentPerson) {
    return (
      <Link
        to={{
          pathname: `/people/${parentPerson.slug}`,
          search: location.search,
        }}
        className={classNames({ 'has-text-danger': parentPerson.sex === 'f' })}
      >
        {parentName}
      </Link>
    );
  }

  return <>{parentName}</>;
};
