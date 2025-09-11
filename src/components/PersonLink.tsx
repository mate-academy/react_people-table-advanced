import classNames from 'classnames';
import { Person } from './../types';
import { Link, useLocation } from 'react-router-dom';

interface Props {
  personName: string | null;
  peoples: Person[];
}

export const PersonLink: React.FC<Props> = ({ personName, peoples }) => {
  const personData = peoples.find(people => people.name === personName);
  const { search } = useLocation();

  if (!personData || !personName) {
    return <span>{personName || '-'}</span>;
  }

  return (
    <Link
      className={classNames({ 'has-text-danger': personData.sex === 'f' })}
      to={`/people/${personData.slug}${search}`}
    >
      {personName}
    </Link>
  );
};
