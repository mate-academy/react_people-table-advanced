import { FC } from 'react';
import classNames from 'classnames';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
};

export const PersonInfo: FC<Props> = ({ person }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': person.slug === slug })}
    >
      <td>
        <Link
          to={`/people/${person.slug}?${searchParams.toString()}`}
          className={classNames({ 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.mother
          ? (
            <Link
              to={`/people/${person.mother.slug}?${searchParams.toString()}`}
              className="has-text-danger"
            >
              {person.mother.name}
            </Link>
          )
          : person.motherName || '-' }
      </td>
      <td>
        {person.father
          ? (
            <Link
              to={`/people/${person.father.slug}?${searchParams.toString()}`}
            >
              {person.father.name}
            </Link>
          )
          : person.fatherName || '-' }
      </td>
    </tr>
  );
};
