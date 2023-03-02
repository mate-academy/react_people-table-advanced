import classNames from 'classnames';
import React, { useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { PersonLink } from '../PersonLink';
import { Person } from '../../types/Person';
import { getFilteredPeople } from '../../utils/functions';
import { SortLink } from '../SortLink';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const { slug: selectedSlug = '' } = useParams();
  const query = searchParams.get('query') || '';
  const sexValue = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');
  const sortValue = searchParams.get('sort') || '';
  const isReversed = searchParams.get('order') === 'desc';

  const visiblePeople = useMemo(() => getFilteredPeople(
    people,
    query,
    sexValue,
    centuries,
    sortValue,
    isReversed,
  ),
  [searchParams]);

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

          const isSelected = slug === selectedSlug;
          const selectedMother = people.find(p => p.name === motherName);
          const selectedFather = people.find(p => p.name === fatherName);
          const motherNameValue = motherName || '-';
          const fatherNameValue = fatherName || '-';

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames({
                'has-background-warning': isSelected,
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
                  : motherNameValue}
              </td>

              <td>
                {selectedFather
                  ? <PersonLink person={selectedFather} />
                  : fatherNameValue}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
