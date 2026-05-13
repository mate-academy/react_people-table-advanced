import React from 'react';
import { Person } from '../types';
import { Link, useLocation, useParams } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { slug } = useParams();
  const { search } = useLocation();

  // console.log(personSlug);

  const selectedPerson = people.find(x => x.slug === slug);

  const personFather = people.find(x => x.name === person.fatherName);
  const personMother = people.find(x => x.name === person.motherName);

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': selectedPerson?.name === person.name,
      })}
    >
      <td>
        <Link
          to={{
            pathname: `/people/${person.slug}`,
            search: search,
          }}
          className={classNames({
            'has-text-danger': person.sex === 'f',
          })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.motherName !== null ? (
          personMother !== undefined ? (
            <Link
              to={{
                pathname: `/people/${personMother.slug}`,
                search: search,
              }}
              className={classNames({
                'has-text-danger': personMother.sex === 'f',
              })}
            >
              {personMother.name}
            </Link>
          ) : (
            person.motherName
          )
        ) : (
          '-'
        )}
      </td>
      <td>
        {person.fatherName !== null ? (
          personFather !== undefined ? (
            <Link
              to={{
                pathname: `/people/${personFather.slug}`,
                search: search,
              }}
              className={classNames({
                'has-text-danger': personFather.sex === 'f',
              })}
            >
              {personFather.name}
            </Link>
          ) : (
            person.fatherName
          )
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};
