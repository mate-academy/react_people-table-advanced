import classNames from 'classnames';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SortLink } from './SortLink';

type Props = {
  people: Person[]
  personSlugSelected: string | undefined
};

export const PeopleTable: React.FC<Props> = ({
  people,
  personSlugSelected,
}) => {
  const getParent = (name: string | null) => (
    people.find((parent) => parent.name === name) || null
  );
  const [searchParams] = useSearchParams();
  const sortfield = searchParams.get('sort') || '';
  const isReversed = searchParams.get('order') === 'desc';

  const newPeople = [...people].sort((a, b) => {
    switch (sortfield) {
      case 'name':
      case 'sex':
        return a[sortfield].localeCompare(b[sortfield]);
      case 'born':
      case 'died':
        return a[sortfield] - b[sortfield];

      default:
        return 0;
    }
  });

  const sortedPeople = !sortfield ? people : newPeople;

  const visiblePeople = isReversed ? sortedPeople.reverse() : sortedPeople;

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
              <SortLink field="name" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SortLink field="sex" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SortLink field="born" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SortLink field="died" />
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map((person) => {
          const {
            slug,
            sex,
            born,
            died,
            motherName,
            fatherName,
          } = person;

          const mother = getParent(motherName);
          const father = getParent(fatherName);

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames({
                'has-background-warning': slug === personSlugSelected,
              })}
            >
              <PersonLink
                person={person}
              />

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              {mother
                ? (
                  <PersonLink
                    person={mother}
                  />
                )
                : (
                  <td>
                    <p>{motherName || '-'}</p>
                  </td>
                )}
              {father
                ? (
                  <PersonLink
                    person={father}
                  />
                )
                : (
                  <td>
                    <p>{fatherName || '-'}</p>
                  </td>
                )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
