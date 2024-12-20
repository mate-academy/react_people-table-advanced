import { FC } from 'react';
import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
  parent: 'mother' | 'father';
};

const ParentLink: FC<Props> = ({ person, parent }) => {
  const [searchParams] = useSearchParams();

  if (!person[parent] && !person[`${parent}Name`]) {
    return '-';
  }

  return person[parent] ? (
    <Link
      to={{
        pathname: `/people/${person[parent].slug}`,
        search: searchParams.toString(),
      }}
      className={classNames({
        'has-text-danger': parent === 'mother',
      })}
    >
      {person[parent].name}
    </Link>
  ) : (
    person[`${parent}Name`]
  );
};

export default ParentLink;
