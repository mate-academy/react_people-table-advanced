import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person,
  mother?: Person,
  father?: Person,
};

export const PersonInfo: React.FC<Props> = ({
  person,
  mother,
  father,
}) => {
  const { personSlug } = useParams();
  const [searchParams] = useSearchParams();

  const getElement = (parent: Person | undefined,
    parentName: string | null) => {
    let element;

    switch (true) {
      case (!!parent):
        element = (
          <Link
            to={`${parent?.slug}`}
            className={cn({
              'has-text-danger': parent?.sex === 'f',
            })}
          >
            {parent?.name}
          </Link>
        );
        break;

      case (parentName !== null):
        element = parentName;
        break;

      default:
        element = '-';
        break;
    }

    return element;
  };

  const motherElement = getElement(mother, person.motherName);
  const fatherElement = getElement(father, person.fatherName);

  return (
    <>
      <tr
        data-cy="person"
        className={cn({
          'has-background-warning': personSlug === person.slug,
        })}
      >
        <td>
          <Link
            to={`/people/${person?.slug}?${searchParams.toString()}`}
            className={cn({
              'has-text-danger': person.sex === 'f',
            })}
          >
            {person.name}
          </Link>
        </td>

        <td>{person.sex}</td>
        <td>{person.born}</td>
        <td>{person.died}</td>
        <td>{motherElement}</td>
        <td>{fatherElement}</td>
      </tr>
    </>
  );
};
