import classNames from 'classnames';
import { FC, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { getVisiblePeople } from '../../utils/getVisiblePeople';
import { PersonNavLink } from '../PersonNavLink';
import { SortLink } from '../SortLink';

type Props = {
  people: Person[],
  selectedSlug: string,
};

export const PeopleTable: FC<Props> = ({ people, selectedSlug }) => {
  const [searchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries');
  const sexFilter = searchParams.get('sex');
  const query = searchParams.get('query');
  const sort = searchParams.get('sort') as keyof Person;
  const isReversed = searchParams.get('order') === 'desc';

  const preparedPeople = useMemo(() => (
    getVisiblePeople(people, centuries, sexFilter, query, sort, isReversed)
  ), [people, centuries, sexFilter, query, sort, isReversed]);

  if (preparedPeople.length === 0) {
    return (
      <p>There are no people matching the current search criteria</p>
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
              <SortLink sort="name" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SortLink sort="sex" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SortLink sort="born" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SortLink sort="died" />
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {preparedPeople.map(person => {
          const {
            sex,
            born,
            died,
            slug,
            motherName,
            fatherName,
          } = person;

          const isSelected = slug === selectedSlug;
          const motherNameCell = motherName || '-';
          const fatherNameCell = fatherName || '-';
          const mother = people?.find(p => p.name === motherName) || null;
          const father = people?.find(p => p.name === fatherName) || null;

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames({ 'has-background-warning': isSelected })}
            >
              <td>
                <PersonNavLink person={person} />
              </td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother
                  ? (
                    <PersonNavLink person={mother} />
                  ) : (
                    motherNameCell
                  )}
              </td>
              <td>
                {father
                  ? (
                    <PersonNavLink person={father} />
                  ) : (
                    fatherNameCell
                  )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
