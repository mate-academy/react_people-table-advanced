import classNames from 'classnames';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonNavLink } from '../PersonLink';
import { SortPeopleLink } from './SortPeopleLink';

type Props = {
  people: Person[],
  slug: string,
};

export const PeopleTable: React.FC<Props> = ({ people, slug }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') as keyof Person;
  const reversedTable = searchParams.get('order') === 'desc';

  const getSortedPeople = (sortBy: keyof Person) => {
    const peopleCopy = [...people];

    if (sortBy) {
      peopleCopy.sort((a, b) => {
        switch (sortBy) {
          case 'name':
          case 'sex':
            return a[sortBy].localeCompare(b[sortBy]);
          case 'born':
          case 'died':
            return a[sortBy] - b[sortBy];
          default:
            return 0;
        }
      });
    }

    if (reversedTable) {
      peopleCopy.reverse();
    }

    return peopleCopy;
  };

  const sortedPeople = getSortedPeople(sort);

  if (!sortedPeople.length) {
    return (
      <p data-cy="noPeopleMessage">
        There are no people on the server
      </p>
    );
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <SortPeopleLink sortLine="name" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SortPeopleLink sortLine="sex" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SortPeopleLink sortLine="born" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SortPeopleLink sortLine="died" />
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map((person) => {
          const fatherObj = people
            .find(father => father.name === person.fatherName);
          const motherObj = people
            .find(mother => mother.name === person.motherName);
          const SelectedPerson = person.slug === slug;

          return (
            <tr
              className={classNames(
                { 'has-background-warning': SelectedPerson },
              )}
              data-cy="person"
            >
              <td>
                <PersonNavLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {motherObj
                  ? (
                    <PersonNavLink person={motherObj} />
                  ) : (
                    person.motherName || '-'
                  )}
              </td>

              <td>
                {fatherObj
                  ? (
                    <PersonNavLink person={fatherObj} />
                  ) : (
                    person.fatherName || '-'
                  )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
