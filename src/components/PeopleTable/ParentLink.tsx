import React from 'react';
import { Person } from '../../types';
import { getPersonByName } from './service';
import classNames from 'classnames';

type Props = {
  person: Person;
  peopleList: Person[];
  parentSex: ParentSex;
};

type ParentSex = 'm' | 'f';

const getFinalElement = (
  sex: ParentSex,
  person: Person,
  peopleList: Person[],
) => {
  const {
    motherName,
    fatherName,
    mother = motherName ? getPersonByName(motherName, peopleList) : null,
    father = fatherName ? getPersonByName(fatherName, peopleList) : null,
  } = person;

  const parentPerson = sex === 'f' ? mother : father;
  const parentName = sex === 'f' ? motherName : fatherName;

  if (parentPerson === null) {
    return '-';
  }

  return parentPerson !== undefined ? (
    <a
      href={`#/people/${parentPerson.slug ?? ''}`}
      className={classNames({
        'has-text-danger': sex === 'f',
      })}
    >
      {parentPerson.name}
    </a>
  ) : (
    parentName
  );
};

export const ParentLink: React.FC<Props> = ({
  person,
  peopleList,
  parentSex,
}) => getFinalElement(parentSex, person, peopleList);
