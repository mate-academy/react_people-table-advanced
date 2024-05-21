import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person;
  people: Person[];
};

const NO_DATA = '-';

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const [searchParam] = useSearchParams();
  const { slugParam } = useParams();

  const { name, sex, born, died, fatherName, motherName, slug } = person;

  const isMother = people.find(p => p.name === motherName);
  const isFather = people.find(p => p.name === fatherName);

  const generateLink = (personSlug: string) => ({
    pathname: `/people/${personSlug}`,
    search: searchParam.toString(),
  });

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === slugParam,
      })}
    >
      <td>
        <Link
          to={generateLink(slug)}
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
      <td>
        {isMother ? (
          <Link
            to={generateLink(isMother.slug)}
            className={classNames({
              'has-text-danger': isMother.sex === 'f',
            })}
          >
            {motherName}
          </Link>
        ) : (
          motherName || NO_DATA
        )}
      </td>
      <td>
        {isFather ? (
          <Link to={generateLink(isFather.slug)}>{fatherName}</Link>
        ) : (
          fatherName || NO_DATA
        )}
      </td>
    </tr>
  );
};
