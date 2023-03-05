import React from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SortLink } from './SortLink';
import { getFilteredPeople } from './getFilteredPeople';

interface PeopleTablePropsType {
  people: Person[],
  personSlug: string,
}

export const PeopleTable: React.FC<PeopleTablePropsType> = ({
  people,
  personSlug,
}) => {
  const [searchParams] = useSearchParams();
  const currentQuery = searchParams.get('query') || '';
  const currentSex = searchParams.get('sex') || '';
  const currentCenturies = searchParams.getAll('centuries')
    .map(num => Number(num));
  const isSelected = (slug: string) => slug === personSlug;

  const visiblePeople = getFilteredPeople(
    people,
    currentSex,
    currentQuery,
    currentCenturies,
  );

  return (
    <table
      data-cy="peopleTable"
      style={{ borderCollapse: 'collapse' }}
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <SortLink sortBy="name" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SortLink sortBy="sex" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SortLink sortBy="born" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SortLink sortBy="died" />
            </span>
          </th>

          <th>Mother</th>

          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map((person: Person) => {
          const {
            sex,
            born,
            died,
            fatherName,
            motherName,
            slug,
            mother,
            father,
          } = person;

          return (
            <tr
              data-cy="person"
              key={slug}
              className={
                classNames({ 'has-background-warning': isSelected(slug) })
              }
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother ? <PersonLink person={mother} /> : motherName || '-'}
              </td>
              <td>
                {father ? <PersonLink person={father} /> : fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
