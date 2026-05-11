import { Link, useLocation } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  name: Person['name'] | null;
  path: string | null;
  highlightAsFemale: boolean;
};

export const PersonLink: React.FC<Props> = ({
  name,
  path,
  highlightAsFemale,
}) => {
  const { search } = useLocation();

  const cssClasses = highlightAsFemale ? 'has-text-danger' : '';
  const displayName = name ?? '-';

  return path ? (
    <Link to={{ pathname: path, search }} className={cssClasses}>
      {displayName}
    </Link>
  ) : (
    <>{displayName}</>
  );
};
