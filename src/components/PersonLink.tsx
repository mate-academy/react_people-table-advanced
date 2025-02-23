import classNames from 'classnames';
import { Person } from '../types';
import { Link, useParams } from 'react-router-dom';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();

  const renderParent = (parent?: Person, name?: string | null) =>
    name ? (
      parent?.slug ? (
        <Link
          to={`../${parent.slug}`}
          className={classNames({ 'has-text-danger': parent.sex === 'f' })}
        >
          {name}
        </Link>
      ) : (
        name
      )
    ) : (
      '-'
    );

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === person.slug,
      })}
    >
      <td>
        <Link
          to={`../${person.slug}`}
          className={classNames({ 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{renderParent(person.mother, person.motherName)}</td>
      <td>{renderParent(person.father, person.fatherName)}</td>
    </tr>
  );
};
