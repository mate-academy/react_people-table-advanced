import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person;
  people: Person[];
};

export const Persona: FC<Props> = props => {
  const {
    person: { sex, slug, name, born, died, motherName, fatherName },
    people,
  } = props;

  const { currentSlug } = useParams();

  const mother = people.find(person => person.name === motherName);
  const father = people.find(person => person.name === fatherName);

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === currentSlug,
      })}
    >
      <td>
        <Link
          to={`../${slug}`}
          className={classNames({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <Link to={`../${mother.slug}`} className="has-text-danger">
            {motherName}
          </Link>
        ) : (
          motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <Link to={`../${father.slug}`}>{fatherName}</Link>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
