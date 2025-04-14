import { Link } from 'react-router-dom';
import { Person } from '../../types';
import { RoutesParts } from '../../types/RoutesURLParts';
import classNames from 'classnames';

interface Props {
  person: Person | undefined;
}

export const PersonLink: React.FC<Props> = ({ person }) => (
  <>
    {person && (
      <Link
        to={`${RoutesParts.people}/${person.slug}`}
        className={classNames({
          'has-text-danger': person.sex === 'f',
        })}
      >
        {person.name}
      </Link>
    )}
  </>
);
