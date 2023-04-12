import React from 'react';
import {
  Link,
  useLocation,
  useParams,
  useResolvedPath,
} from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person;
  allPeople: Person[];
};

export const PersonInfo: React.FC<Props> = ({ person, allPeople }) => {
  const {
    slug,
    name,
    died,
    born,
    sex,
    motherName,
    fatherName,
  } = person;
  const { personId } = useParams();
  const location = useLocation();
  const parentPath = useResolvedPath('../').pathname;

  const isSelected = person.slug === personId;
  const findFather = allPeople.find(human => (
    human.name === person.fatherName
  ));
  const findMother = allPeople.find(human => (
    human.name === person.motherName
  ));

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': isSelected,
      })}
    >
      <td>
        <Link
          to={{
            pathname: parentPath + slug,
            search: location.search,
          }}
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
        {findMother ? (
          <Link
            className="has-text-danger"
            to={{
              pathname: parentPath + findMother.slug,
              search: location.search,
            }}
          >
            {motherName}
          </Link>
        ) : (
          motherName || '-'
        )}
      </td>

      <td>
        {findFather ? (
          <Link
            to={{
              pathname: parentPath + findFather.slug,
              search: location.search,
            }}
          >

            {fatherName}
          </Link>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
