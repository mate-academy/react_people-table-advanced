import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { getSearchWith } from '../../utils/searchHelper';

interface Props {
  person: Person | undefined;
  parentName?: string;
}

export const PersonLink: React.FC<Props> = ({ person, parentName }) => {
  const [searchParams] = useSearchParams();

  return (person
    ? (
      <td>
        <Link
          to={`../${person.slug}?${getSearchWith(searchParams, {}).toString()}`}
          className={classNames({ 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </Link>
      </td>
    )
    : <td>{parentName}</td>
  );
};
