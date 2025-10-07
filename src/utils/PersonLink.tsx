import { Link } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

type Props = {
  person?: Person;
  children?: React.ReactNode;
};

export const PersonLink: React.FC<Props> = ({ person, children }) => {
  const [searchParams] = useSearchParams();

  if (!person) {
    return <>{children || ''}</>;
  }

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search: searchParams.toString(),
      }}
      className={classNames('', {
        'has-text-danger': person.sex === 'f',
      })}
    >
      {children || person.name}
    </Link>
  );
};
