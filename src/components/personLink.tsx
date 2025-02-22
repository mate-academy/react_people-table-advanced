import { Link, useLocation, useParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

type Props = {
  person: Person;
  people: Person[];
};

const findPersonByName = (people: Person[], name: string): Person | undefined =>
  people.find(item => item.name === name);

const renderMotherCell = (
  person: Person,
  people: Person[],
  search: string,
): JSX.Element => {
  const { motherName } = person;

  if (!motherName) {
    return <td>-</td>;
  }

  const mother = findPersonByName(people, motherName);

  if (!mother) {
    return <td>{motherName}</td>;
  }

  return (
    <td>
      <Link
        to={{ pathname: `/people/${mother.slug}`, search }}
        className="has-text-danger"
      >
        {motherName}
      </Link>
    </td>
  );
};

const renderFatherCell = (
  person: Person,
  people: Person[],
  search: string,
): JSX.Element => {
  const { fatherName } = person;

  if (!fatherName) {
    return <td>-</td>;
  }

  const father = findPersonByName(people, fatherName);

  if (!father) {
    return <td>{fatherName}</td>;
  }

  return (
    <td>
      <Link to={{ pathname: `/people/${father.slug}`, search }}>
        {fatherName}
      </Link>
    </td>
  );
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { name, sex, born, died, slug } = person;
  const { search } = useLocation();
  const { personId } = useParams<{ personId: string }>();

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': personId === slug,
      })}
    >
      <td>
        <Link
          to={{ pathname: `/people/${slug}`, search }}
          className={classNames({
            'has-text-danger': sex === 'f',
          })}
        >
          {name}
        </Link>
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      {renderMotherCell(person, people, search)}
      {renderFatherCell(person, people, search)}
    </tr>
  );
};
