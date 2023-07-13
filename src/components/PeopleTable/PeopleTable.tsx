import React, { useCallback } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { SortLinksNames } from '../../types/SortLinks';
import { SearchLink } from '../SearchLink';

export type PropsPeopleTable = {
  people: Person[],
  filteredPeople: Person[],
};

const sortLinks = [
  { name: SortLinksNames.NAME, value: 'name' },
  { name: SortLinksNames.SEX, value: 'sex' },
  { name: SortLinksNames.BORN, value: 'born' },
  { name: SortLinksNames.DIED, value: 'died' },
];

export const PeopleTable: React.FC<PropsPeopleTable> = ({
  people,
  filteredPeople,
}) => {
  const { personSlug } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const findParentOfPerson = useCallback((parentName: string | null) => {
    return people.find((person: Person) => person.name === parentName);
  }, []);

  const setNewParamsForSort = (sortValue: string) => {
    return sort === sortValue && order === 'desc'
      ? {
        sort: null,
        order: null,
      }
      : {
        sort: sortValue,
        order: sort === sortValue
          ? 'desc'
          : null,
      };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortLinks.map(sortLink => {
            const { name, value } = sortLink;

            return (
              <th key={name}>
                <span className="is-flex is-flex-wrap-nowrap">
                  <p>
                    {name}
                  </p>
                  <SearchLink
                    params={setNewParamsForSort(value)}
                  >
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': sort !== value || sort,
                          'fa-sort-up': sort === value && order === null,
                          'fa-sort-down': sort === value
                            && order === 'desc',
                        })}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>
            );
          })}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredPeople.map(person => {
          const {
            name,
            slug,
            motherName,
            fatherName,
            sex,
            born,
            died,
          } = person;
          const personMother = findParentOfPerson(motherName);
          const personFather = findParentOfPerson(fatherName);

          return (
            <tr
              key={name}
              data-cy="person"
              className={classNames({
                'has-background-warning': personSlug === slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              {motherName
                ? (
                  <td>
                    {personMother
                      ? (
                        <PersonLink
                          person={personMother}
                        />
                      )
                      : motherName}
                  </td>
                )
                : <td>-</td>}

              {fatherName
                ? (
                  <td>
                    {personFather
                      ? (
                        <PersonLink
                          person={personFather}
                        />
                      )
                      : fatherName}
                  </td>
                )
                : <td>-</td>}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
