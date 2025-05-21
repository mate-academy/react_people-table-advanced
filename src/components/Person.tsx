import cn from 'classnames';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person as PersonType } from '../types';
import React from 'react';
import { genderKeyFemale } from '../types/FilterBy';

type Props = {
  person: PersonType;
  people: PersonType[];
};

export const Person: React.FC<Props> = ({ person, people }) => {
  const [searchParams] = useSearchParams();
  const currentSearch = searchParams.toString();
  const searchString = currentSearch ? `?${currentSearch}` : '';

  const { slugParam } = useParams();
  const { name, sex, born, died, slug, motherName, fatherName } = person;

  const findParent = (parentName: string | null) => {
    if (!parentName) {
      return '-';
    }

    const parent = people.find(man => man.name === parentName);

    return parent ? (
      <Link
        to={`/people/${parent.slug}${searchString}`}
        className={cn('', {
          'has-text-danger': parent.sex === genderKeyFemale,
        })}
      >
        {parent.name}
      </Link>
    ) : (
      parentName
    );
  };

  const mother = findParent(motherName);
  const father = findParent(fatherName);

  return (
    <tr
      data-cy="person"
      className={cn(person.slug === slugParam && 'has-background-warning')}
    >
      <td>
        <Link
          className={cn('', {
            'has-text-danger': sex === genderKeyFemale,
          })}
          to={`../${slug}${searchString}`}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{mother}</td>
      <td>{father}</td>
    </tr>
  );
};
