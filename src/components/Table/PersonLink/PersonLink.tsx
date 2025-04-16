import { Link } from 'react-router-dom';
import { Person } from '../../../types';
import { RoutesParts } from '../../../constants/RoutesURLParts';
import classNames from 'classnames';
import { PersonSex } from '../../../constants/PersonSex';

interface Props {
  person: Person | undefined;
}

export const PersonLink: React.FC<Props> = ({ person }) => (
  <>
    {person && (
      <Link
        to={`${RoutesParts.people}/${person.slug}`}
        className={classNames({
          'has-text-danger': person.sex === PersonSex.Female,
        })}
      >
        {person.name}
      </Link>
    )}
  </>
);
