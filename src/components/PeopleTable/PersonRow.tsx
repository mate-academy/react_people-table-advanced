import classNames from 'classnames';
import { FC } from 'react';
import { Person } from '../../types';

type Props = {
  person: Person;
  searchString: string;
  slug?: string;
};

export const PersonRow: FC<Props> = ({ person, searchString, slug }) => {
  return (
    <tr
      data-cy="person"
      className={classNames(
        { 'has-background-warning': slug === person.slug },
      )}
    >
      <td>
        <a
          className={`link${person.sex === 'f' ? ' link--red' : ''}`}
          href={`#/people/${person.slug}${searchString.length ? `?${searchString}` : ''}`}
        >
          {person.name}
        </a>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      {person.mother
        ? (
          <td>
            <a
              className="link link--red"
              href={`#/people/${person.mother.slug}${searchString.length ? `?${searchString}` : ''}`}
            >
              {person.motherName}
            </a>
          </td>
        ) : (
          <td>{person.motherName || '-'}</td>
        )}
      {person.father
        ? (
          <td>
            <a
              className="link"
              href={`#/people/${person.father.slug}${searchString.length ? `?${searchString}` : ''}`}
            >
              {person.fatherName}
            </a>
          </td>
        ) : (
          <td>{person.fatherName || '-'}</td>
        )}
    </tr>
  );
};
