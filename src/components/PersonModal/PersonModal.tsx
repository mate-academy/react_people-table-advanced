import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../../types/Person';
import { ParentLink } from './ParentLink';

interface Props {
  person: Person;
  selectedPersonSlug: string;
  people: Person[];
}

export const PersonModal: React.FC<Props> = ({
  person,
  selectedPersonSlug,
  people,
}) => {
  const {
    slug, sex, name, died, born, motherName, fatherName,
  } = person;

  const location = useLocation();

  const tableRowClasses = classNames({
    'has-background-warning': selectedPersonSlug === slug,
  });

  const linkClasses = classNames({
    'has-text-danger': sex === 'f',
  });

  return (
    <tr data-cy="person" className={tableRowClasses}>
      <td>
        <Link
          to={{
            pathname: `/people/${slug}`,
            search: location.search,
          }}
          className={linkClasses}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td><ParentLink people={people} parentName={motherName} /></td>
      <td><ParentLink people={people} parentName={fatherName} /></td>
    </tr>
  );
};
