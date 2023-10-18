import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person,
  searchParams: URLSearchParams
  selectedPerson: string | undefined,
};

export const PersonLink: React.FC<Props> = ({
  person,
  searchParams,
  selectedPerson,
}) => (
  <Link
    to={{
      pathname: selectedPerson
        ? `../${person.slug}`
        : `./${person.slug}`,
      search: searchParams.toString(),
    }}
    className={classNames({
      'has-text-danger': person.sex === 'f',
    })}
  >
    {person.name}
  </Link>
);
