import { FC } from 'react';
import { Link, useLocation, useResolvedPath } from 'react-router-dom';
import classNames from 'classnames';

import { Person } from '../types';
import { SortLink } from './SortLink';
import { SortPeople } from '../utils/SortPeople';

type Props = {
  people: Person[]
  selectedPersonSlug: string;
};

export const PeopleTable: FC<Props> = ({ people, selectedPersonSlug }) => {
  const isSelected = (person: Person) => person.slug === selectedPersonSlug;
  const location = useLocation();
  const parentPath = useResolvedPath('../').pathname;

  const findPersonParents = (personParent: string | null) => {
    return people.find(person => personParent === person.name);
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <SortLink sortBy={SortPeople.Name} />
          </th>

          <th>
            <SortLink sortBy={SortPeople.Sex} />
          </th>

          <th>
            <SortLink sortBy={SortPeople.Born} />
          </th>

          <th>
            <SortLink sortBy={SortPeople.Died} />
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const preparedMotherName = person.motherName || '-';
          const preparedFatherName = person.fatherName || '-';
          const mother = findPersonParents(person.motherName);
          const father = findPersonParents(person.fatherName);

          return (
            <tr
              data-cy="person"
              key={`${person.name}`}
              className={classNames(
                { 'has-background-warning': isSelected(person) },
              )}
            >
              <td>
                <Link
                  to={{
                    pathname: parentPath + person.slug,
                    search: location.search,
                  }}
                  className={classNames(
                    { 'has-text-danger': person.sex === 'f' },
                  )}
                >
                  {person.name}
                </Link>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother
                  ? (
                    <Link
                      to={{
                        pathname: parentPath + mother.slug,
                        search: location.search,
                      }}
                      className="has-text-danger"
                    >
                      {person.motherName}
                    </Link>
                  ) : preparedMotherName}
              </td>

              <td>
                {father
                  ? (
                    <Link
                      to={{
                        pathname: parentPath + father.slug,
                        search: location.search,
                      }}
                    >
                      {person.fatherName}
                    </Link>
                  ) : preparedFatherName}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
