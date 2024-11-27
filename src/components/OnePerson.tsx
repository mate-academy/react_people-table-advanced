import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

type Props = {
  person: Person;
  people: Person[];
  searchParams: URLSearchParams;
};

export const OnePerson: React.FC<Props> = ({
  person,
  people,
  searchParams,
}) => {
  const { personSlug } = useParams();
  const selectedPerson = personSlug ? personSlug : '';

  function findParentLink(name: string | null) {
    if (name === null) {
      return '-';
    }

    const parent = people.find(p => p.name === name);

    if (parent && parent.sex === 'f') {
      return (
        <Link
          to={`../${parent.slug}?${searchParams.toString()}`}
          className="has-text-danger"
        >
          {parent.name}
        </Link>
      );
    }

    if (parent && parent.sex === 'm') {
      return (
        <Link to={`../${parent.slug}?${searchParams.toString()}`}>
          {parent.name}
        </Link>
      );
    }

    return name;
  }

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': selectedPerson === person.slug,
      })}
    >
      <td>
        <Link
          to={`../${person.slug}?${searchParams.toString()}`}
          className={classNames({ 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{findParentLink(person.motherName)}</td>
      <td>{findParentLink(person.fatherName)}</td>
    </tr>
  );
};
