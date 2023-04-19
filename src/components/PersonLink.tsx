import {
  Link, useLocation, useResolvedPath,
} from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

interface Props {
  person: Person;
  selectedSlug: string,
}

export const PersonLink: React.FC<Props> = ({
  person,
  selectedSlug,
}) => {
  const {
    name,
    sex,
    slug,
  } = person;

  const location = useLocation();
  const parentPath = useResolvedPath('../').pathname;

  return (
    <Link
      to={{
        pathname: slug === selectedSlug ? parentPath : parentPath + slug,
        search: location.search,
      }}
      className={classNames({
        'has-text-danger': sex === 'f',
      })}
    >
      {name}
    </Link>
  );
};
