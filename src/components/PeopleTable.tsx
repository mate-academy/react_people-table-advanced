import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useParams, useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();
  const selectedSlug = personSlug || '';
  const [searchParams] = useSearchParams();
  const thColumnsNames = ['Name', 'Sex', 'Born', 'Died'];

  const getParent = (
    person: Person,
    parentKey: 'motherName' | 'fatherName',
  ): Person | undefined => {
    const parentName = person[parentKey];

    return people.find(p => p.name === parentName);
  };

  const isSorted = (field: string) => searchParams.get('sort') === field;
  const isDescending = searchParams.get('order') === 'desc';

  const getSortParams = (field: string) => {
    if (!isSorted(field)) {
      return { sort: field, order: null };
    }

    if (!isDescending) {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {thColumnsNames.map(item => (
            <th key={item}>
              <span className="is-flex is-flex-wrap-nowrap">
                {item}
                <SearchLink params={getSortParams(`${item.toLowerCase()}`)}>
                  <span className="icon">
                    <i
                      className={`fas ${
                        isSorted(`${item.toLowerCase()}`)
                          ? isDescending
                            ? 'fa-sort-down'
                            : 'fa-sort-up'
                          : 'fa-sort'
                      }`}
                    />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={
              selectedSlug === person.slug ? 'has-background-warning' : ''
            }
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName ? (
                getParent(person, 'motherName') ? (
                  <PersonLink person={getParent(person, 'motherName')!} />
                ) : (
                  person.motherName
                )
              ) : (
                '-'
              )}
            </td>

            <td>
              {person.fatherName ? (
                getParent(person, 'fatherName') !== undefined ? (
                  <PersonLink person={getParent(person, 'fatherName')!} />
                ) : (
                  person.fatherName
                )
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
