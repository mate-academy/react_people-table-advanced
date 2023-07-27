import React, { FC } from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SortLink } from './SortLink';

type Props = {
  people: Person[],
  selectedSlug: string,
};

export const PeopleTable: FC<Props> = React.memo(({ people, selectedSlug }) => {
  const isSelected = (person: Person) => person.slug === selectedSlug;
  const [searchParams] = useSearchParams();
  const currentSort = searchParams.get('sort') || null;
  const currentOrder = searchParams.get('order') || null;
  const sortFields = {
    Name: 'name',
    Sex: 'sex',
    Born: 'born',
    Died: 'died',
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(sortFields).map(([key, value]) => {
            return (

              <th key={key}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {key}
                  <SortLink
                    fieldName={value}
                    currentSort={currentSort}
                    currentOrder={currentOrder}
                  />
                </span>
              </th>

            );
          })}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map((person) => {
          const mother = people
            .find((parent) => parent.name === person.motherName);
          const father = people
            .find((parent) => parent.name === person.fatherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames(
                { 'has-background-warning': isSelected(person) },
              )}
            >
              <td>
                <PersonLink person={person} selectedSlug={person.slug} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother
                  ? (<PersonLink person={mother} selectedSlug={mother.slug} />)
                  : (person.motherName || '-')}
              </td>
              <td>
                {father
                  ? <PersonLink person={father} selectedSlug={father.slug} />
                  : person.fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
});
