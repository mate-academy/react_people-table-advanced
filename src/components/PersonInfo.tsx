import React from 'react';
import {
  useLocation,
  useParams,
  useResolvedPath,
} from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

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
  const foundFather = allPeople.find(human => (
    human.name === person.fatherName
  ));
  const foundMother = allPeople.find(human => (
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
        <PersonLink
          pathname={parentPath + slug}
          search={location.search}
          name={name}
          sex={sex}
        />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {foundMother ? (
          <PersonLink
            pathname={parentPath + foundMother.slug}
            search={location.search}
            name={foundMother.name}
            sex="f"
          />
        ) : (
          motherName || '-'
        )}
      </td>

      <td>
        {foundFather ? (
          <PersonLink
            pathname={parentPath + foundFather.slug}
            search={location.search}
            name={foundFather.name}
            sex="m"
          />
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
