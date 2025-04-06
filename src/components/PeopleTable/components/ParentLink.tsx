import React, { useContext } from 'react';
import { Person } from '../../../types';
import { getPersonByName } from '../utils/service';
import classNames from 'classnames';
import { Context } from '../../../context/PeoplePageContext';
import { useSearchParams } from 'react-router-dom';

type Props = {
  person: Person;
  parentSex: 'm' | 'f';
};

export const ParentLink: React.FC<Props> = ({ person, parentSex: sex }) => {
  const [searchParams] = useSearchParams();
  const {
    context: { fullList },
  } = useContext(Context);

  const {
    motherName,
    fatherName,
    mother = motherName ? getPersonByName(motherName, fullList) : null,
    father = fatherName ? getPersonByName(fatherName, fullList) : null,
  } = person;

  const parentPerson = sex === 'f' ? mother : father;
  const parentName = sex === 'f' ? motherName : fatherName;
  const params = !!searchParams.size ? `?${searchParams}` : '';

  if (parentPerson === null) {
    return '-';
  }

  return parentPerson !== undefined ? (
    <a
      href={`#/people/${parentPerson.slug ?? ''}${params}`}
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
