import classNames from 'classnames';
import React, { useMemo } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonalLink } from '../PersonalLink/PersonalLink';
import { SortOption } from '../SortOption/SortOption';

type Props = {
  people: Person[];
  selectedPerson: string;
};

export const PeopleTable: React.FC<Props> = (
  {
    people,
    selectedPerson,
  },
) => {
  const { search } = useLocation();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';

  const sortPeople = () => {
    if (search.includes('desc')) {
      people.sort((p1, p2) => {
        switch (sort) {
          case 'name':
          case 'sex':
            return p2[sort].localeCompare(p1[sort]);
          case 'born':
          case 'died':
            return p2[sort] - p1[sort];

          default:
            return 0;
        }
      });
    } else {
      people.sort((p1, p2) => {
        switch (sort) {
          case 'name':
          case 'sex':
            return p1[sort].localeCompare(p2[sort]);
          case 'born':
          case 'died':
            return p1[sort] - p2[sort];

          default:
            return 0;
        }
      });
    }

    return people;
  };

  const sortedPeople = useMemo(sortPeople, [people, search]);

  return (
    <>
      {sortedPeople.length === 0
        ? (
          <p data-cy="noPeopleMatchingMessage">
            There are no people matching the current search criteria
          </p>
        )
        : (
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <SortOption option="Name" />
                <SortOption option="Sex" />
                <SortOption option="Born" />
                <SortOption option="Died" />
                <th>Mother</th>
                <th>Father</th>
              </tr>
            </thead>

            <tbody>
              {sortedPeople.map(person => (
                <tr
                  data-cy="person"
                  key={person.name}
                  className={classNames({
                    'has-background-warning': person.slug === selectedPerson,
                  })}
                >
                  <td>
                    <PersonalLink person={person} />
                  </td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>
                    {
                      (person.mother
                        ? (
                          <Link
                            className="has-text-danger"
                            to={
                              {
                                pathname: `/people/${person.mother.slug}`,
                                search,
                              }
                            }
                          >
                            {person.motherName}
                          </Link>
                        )
                        : person.motherName) || '-'
                    }
                  </td>
                  <td>
                    {
                      (person.father
                        ? (
                          <Link
                            to={
                              {
                                pathname: `/people/${person.father.slug}`,
                                search,
                              }
                            }
                          >
                            {person.fatherName}
                          </Link>
                        )
                        : person.fatherName) || '-'
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
    </>
  );
};
