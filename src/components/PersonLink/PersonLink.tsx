import { NavLink, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { Person } from '../../types';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();

  const getLinkClass = (sex: string) => {
    return classNames('', {
      'has-text-danger': sex === 'f',
    });
  };

  return (
    <NavLink
      to={{
        pathname: `../${person?.slug}`,
        search: searchParams.toString(),
      }}
      className={getLinkClass(person.sex)}
    >
      {person?.name}
    </NavLink>
  );
};
