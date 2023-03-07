import classNames from 'classnames';
import { Link, useLocation, useResolvedPath } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person
};
export const PersonNavLink:React.FC<Props> = ({ person }) => {
  const location = useLocation();
  const parenthPath = useResolvedPath('../').pathname;
  const { slug, name, sex } = person;

  return (
    <Link
      to={{
        pathname: parenthPath + slug,
        search: location.search,
      }}
      className={classNames({ 'has-text-danger': sex === 'f' })}
    >
      {name}
    </Link>
  );
};
