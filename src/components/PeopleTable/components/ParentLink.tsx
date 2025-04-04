import React, { useContext } from 'react';
import { Person } from '../../../types';
import { getPersonByName } from '../utils/service';
import classNames from 'classnames';
import { Context } from '../../../utils/context/MainContext';

type Props = {
  person: Person;
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

export const ParentLink: React.FC<Props> = ({ person, parentSex }) => {
  const mainContext = useContext(Context);
  const {
    context: { fullList: peopleList },
  } = mainContext;

  return getFinalElement(parentSex, person, peopleList);
};
