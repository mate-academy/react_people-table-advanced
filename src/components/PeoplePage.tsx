import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import classNames from 'classnames';

type Props = {
  name: string | null;
  people: Person[];
  to?: string;
};

export const PeoplePage = ({ name, people, to }: Props) => {
  const [searchParams] = useSearchParams();

  if (!name) {
    return '-';
  }

  const person = people.find(p => p.name === name);

  if (!person) {
    return name;
  }

  return (
    <Link
      to={{
        pathname: to || `/people/${person.slug}`,
        search: searchParams.toString(),
      }}
      className={classNames({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {name}
    </Link>
  );
};
