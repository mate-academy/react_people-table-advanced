import { Link } from 'react-router-dom';
import { PATHS } from '../../utils/const';
import { Person } from '../../types';
import classNames from 'classnames';
import { FilterTypes } from '../../utils/enums';

type Props = {
  person: Person;
  name: string | null;
};

export const PersonLink: React.FC<Props> = ({ person, name }) => {
  return (
    <Link
      className={classNames('', {
        'has-text-danger': person.sex === FilterTypes.Female,
      })}
      to={`${PATHS.people}/${person.slug}`}
    >
      {name}
    </Link>
  );
};
