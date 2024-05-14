import React from 'react';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonsParentLink } from './PersonsParentLink';

enum Sex {
  Male = 'm',
  Female = 'f',
}

type PersonLinkElementProps = {
  slug: string;
  name: string;
  sex: string;
};

export const PersonLinkElement: React.FC<PersonLinkElementProps> = ({
  slug,
  name,
  sex,
}) => (
  <Link
    to={`/people/${slug}`}
    className={classNames({ 'has-text-danger': sex === Sex.Female })}
  >
    {name}
  </Link>
);

type Props = {
  person: Person;
  peopleList: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, peopleList }) => {
  const { name, slug, sex, born, died, fatherName, motherName } = person;
  const selectedPerson = useParams().personSlug;

  const isPersonInList = (personName: string) => {
    return peopleList.find(human => human.name === personName);
  };

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === selectedPerson,
      })}
      key={slug}
    >
      <td>
        <PersonLinkElement slug={slug} name={name} sex={sex} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {motherName ? (
          isPersonInList(motherName) ? (
            <PersonsParentLink
              peopleList={peopleList}
              personName={motherName}
            />
          ) : (
            motherName
          )
        ) : (
          '-'
        )}
      </td>

      <td>
        {fatherName ? (
          isPersonInList(fatherName) ? (
            <PersonsParentLink
              peopleList={peopleList}
              personName={fatherName}
            />
          ) : (
            fatherName
          )
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};
