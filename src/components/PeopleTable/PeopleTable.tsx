import React, { useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { getFilteredTodos } from '../../utils/getFilteredPeople';
import { SortLink } from '../SortLink';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const { slug: selectedSlug = '' } = useParams();
  const query = searchParams.get('query') || '';
  const sexParam = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');
  const sortParam = searchParams.get('sort') || '';
  const isReversed = searchParams.get('order') === 'desc';

  const visiblePeople = useMemo(
    () => getFilteredTodos(
      people,
      query,
      sexParam,
      centuries,
      sortParam,
      isReversed,
    ),
    [searchParams],
  );

  if (!visiblePeople.length) {
    return <p>There are no people matching the current search criteria</p>;
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
        {visiblePeople.map(person => {
          const {
            sex,
            born,
            died,
            motherName,
            fatherName,
            slug,
          } = person;

          const hasSelected = slug === selectedSlug;
          const selectedMother = people.find(p => p.name === motherName);
          const selectedFather = people.find(p => p.name === fatherName);
          const motherNameCell = motherName || '-';
          const fatherNameCell = fatherName || '-';

          return (
            <tr
              key={slug}
              data-cy="person"
              className={cn({
                'has-background-warning': hasSelected,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>
                {selectedMother
                  ? <PersonLink person={selectedMother} />
                  : motherNameCell}
              </td>

              <td>
                {selectedFather
                  ? <PersonLink person={selectedFather} />
                  : fatherNameCell}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
