import React from 'react';
import classNames from 'classnames';
import { useSearchParams, useParams } from 'react-router-dom';
import { PersonName } from './PersonName';
// import { PeopleContext } from '../../hoc/PeopleProvider';

type Props = {
  person: People,
  mother: People | null,
  father: People | null,
};

export const PersonRow: React.FC<Props> = ({ person, mother, father }) => {
  // const { people } = useContext(PeopleContext);
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || '';

  const { slug } = useParams<{ slug: string }>();

  // const mother = people.find(mam => mam.name === person.motherName);
  // const father = people.find(dad => dad.name === person.fatherName);

  return (
    <>
      <td
        className={classNames({
          'has-background-link-light': sortBy === 'name',
          'has-background-grey-lighter': person.slug === slug,
        })}
      >
        <PersonName person={person} />
      </td>
      <td
        className={classNames({
          'has-background-link-light': sortBy === 'sex',
          'has-background-grey-lighter': person.slug === slug,
        })}
      >
        {person.sex === 'f' ? 'Female' : 'Male'}
      </td>
      <td
        className={classNames({
          'has-background-link-light': sortBy === 'born',
          'has-background-grey-lighter': person.slug === slug,
        })}
      >
        {person.born}
      </td>
      <td
        className={classNames({
          'has-background-link-light': sortBy === 'died',
          'has-background-grey-lighter': person.slug === slug,
        })}
      >
        {person.died}
      </td>
      <td>
        {mother
          ? (
            <PersonName person={mother} />
          )
          : (
            person.motherName
            || <p className="is-italic">unknown</p>
          )}
      </td>
      <td>
        {father
          ? (
            <PersonName person={father} />
          )
          : (
            person.fatherName
            || <p className="is-italic">unknown</p>
          )}
      </td>
    </>
  );
};
