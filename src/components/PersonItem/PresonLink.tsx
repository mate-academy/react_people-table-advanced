import { ReactNode, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types';
import { appContext } from '../../storage/AppContext/AppContext';

type Props = {
  person: Person;
  children: ReactNode;
};

export const PresonLink: React.FC<Props> = ({ person, children }) => {
  const { searchParams } = useContext(appContext);
  const search = searchParams.toString();
  const isFem = person.sex === 'f';

  return (
    <Link
      to={{ pathname: `../${person.slug}`, search }}
      state={{ search }}
      className={isFem ? 'has-text-danger' : ''}
    >
      {children}
    </Link>
  );
};
