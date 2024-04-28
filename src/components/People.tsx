import React from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { usePeopleState } from '../store/PeopleContext';

import { Person } from '../types';

export const People: React.FC = () => {
  const { people } = usePeopleState();

  const { pathname } = useLocation();

  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || "";
  const q = searchParams.get('q') || "";
  const centuries = Number(searchParams.get('centuries') || 0);

  const getSlugByName = (name: string) => {
    const human = people.find((person: Person) => person.name === name);

    return human?.slug || null;
  };

  const setNameColor = (sex: string) => {
    if (null) {
      return;
    }

    return cn({
      'has-text-danger': sex === 'f',
      'has-text-success': sex === 'm',
    });
  };

  const getFilteredPeople = (people: Person[]) => {
    if(sex === 'm') {
      return people
        .filter((person: Person) => person.sex === 'm')
    } else if(sex === 'f') {
      return people
        .filter((person: Person) => person.sex === 'f')
    } else if (q) {
      return people
        .filter((person: Person) =>
          person.name.toLowerCase().includes(q.toLowerCase())
          || person.motherName?.toLowerCase().includes(q.toLowerCase())
          || person.fatherName?.toLowerCase().includes(q.toLowerCase())
        )
    } else if (centuries) {
      return people
        .filter((person: Person) =>
          person.born >= (centuries * 100 - 99)
          && person.born <= centuries * 100
        )
    }

    return people;
  }

  const filteredPeople = getFilteredPeople(people);

  return (
    <>
      {filteredPeople.map((person: Person) => {
                  const {
                    name,
                    sex,
                    born,
                    died,
                    motherName,
                    fatherName,
                    slug,
                  } = person;

                  const motherSlug = motherName
                    ? getSlugByName(motherName)
                    : null;

                  const fatherSlug = fatherName
                    ? getSlugByName(fatherName)
                    : null;

                  return (
                    <tr
                      key={Math.random()}
                      data-cy="person"
                      className={cn({
                        'has-background-warning':
                          slug === pathname.slice(8),
                      })}
                    >
                      <td>
                        <Link
                          to={`/people/${slug}`}
                          className={setNameColor(sex)}
                        >
                          {name}
                        </Link>
                      </td>

                      <td>{sex}</td>

                      <td>{born}</td>

                      <td>{died}</td>

                      <td>
                        {motherSlug ? (
                          <Link
                            to={`/people/${motherSlug}`}
                            className={setNameColor('f')}
                          >
                            {motherName}
                          </Link>
                        ) : (
                          <p>{motherName ? motherName : '-'}</p>
                        )}
                      </td>

                      <td>
                        {fatherSlug ? (
                          <Link
                            to={`/people/${fatherSlug}`}
                            className={setNameColor('m')}
                          >
                            {fatherName}
                          </Link>
                        ) : (
                          <p>{fatherName ? fatherName : '-'}</p>
                        )}
                      </td>
                    </tr>
                  );
                })}
    </>
  );
}